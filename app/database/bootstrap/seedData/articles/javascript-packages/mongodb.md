# CLI usage

## Install
```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.0 multiverse"
	| sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
echo "mongodb-org hold" | sudo dpkg --set-selections
echo "mongodb-org-server hold" | sudo dpkg --set-selections
echo "mongodb-org-shell hold" | sudo dpkg --set-selections
echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
echo "mongodb-org-tools hold" | sudo dpkg --set-selections
```
## Comands
```
sudo service mongod start
sudo service mongod stop
sudo service mongod restart
mongo
mongo &lt;databaseName&gt;
mongo &lt;databaseName&gt; --eval "db.dropDatabase()"
mongodump --db database_name --collection collection_name
mongorestore --db database_name path_to_bson_file
```

## Uninstall
```
sudo service mongod stop
sudo apt-get purge mongodb-org*
sudo rm -r /var/log/mongodb
sudo rm -r /var/lib/mongodb
```

## Info

* By default, mongodb runs on port `27017`
* The logfile is stored at: `/var/log/mongodb/mongod.log`

# NodeJS Usage

```
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	var dbo = db.db("mydb");
	dbo.collection('orders').find()
		.toArray(function(err, res) {
			if (err) throw err;
			console.log(JSON.stringify(res));
			db.close();
	});
});
```

## NodeJS usage, with graph QL

```
import {MongoClient, ObjectId} from 'mongodb'
import express from 'express'
import bodyParser from 'body-parser'
import {graphqlExpress, graphiqlExpress} from 'graphql-server-express'
import {makeExecutableSchema} from 'graphql-tools'
import cors from 'cors'
import {prepare} from "../util/index"

const prepare = (o) => {
	o._id = o._id.toString()
	return o
}

const app = express()

app.use(cors())

const homePath = '/graphiql'
const URL = 'http://localhost'
const PORT = 3001
const MONGO_URL = 'mongodb://localhost:27017/blog'

export const start = async () => {
	try {
	const db = await MongoClient.connect(MONGO_URL)

	const Posts = db.collection('posts')
	const Comments = db.collection('comments')

	const typeDefs = [`
		type Query {
		post(_id: String): Post
		posts: [Post]
		comment(_id: String): Comment
		}
		type Post {
		_id: String
		title: String
		content: String
		comments: [Comment]
		}
		type Comment {
		_id: String
		postId: String
		content: String
		post: Post
		}
		type Mutation {
		createPost(title: String, content: String): Post
		createComment(postId: String, content: String): Comment
		}
		schema {
		query: Query
		mutation: Mutation
		}
	`];

	const resolvers = {
		Query: {
		post: async (root, {_id}) => {
			return prepare(await Posts.findOne(ObjectId(_id)))
		},
		posts: async () => {
			return (await Posts.find({}).toArray()).map(prepare)
		},
		comment: async (root, {_id}) => {
			return prepare(await Comments.findOne(ObjectId(_id)))
		},
		},
		Post: {
		comments: async ({_id}) => {
			return (await Comments.find({postId: _id}).toArray()).map(prepare)
		}
		},
		Comment: {
		post: async ({postId}) => {
			return prepare(await Posts.findOne(ObjectId(postId)))
		}
		},
		Mutation: {
		createPost: async (root, args, context, info) => {
			const res = await Posts.insertOne(args)
			return prepare(res.ops[0])
		},
		createComment: async (root, args) => {
			const res = await Comments.insert(args)
			return prepare(await Comments.findOne({_id: res.insertedIds[1]}))
		},
		},
	}

	const schema = makeExecutableSchema({
		typeDefs,
		resolvers
	})


	app.use('/graphql', bodyParser.json(), graphqlExpress({schema}))


	app.use(homePath, graphiqlExpress({
		endpointURL: '/graphql'
	}))

	app.listen(PORT, () => {
		console.log(`Visit ${URL}:${PORT}${homePath}`)
	})

	} catch (e) {
	console.log(e)
	}

}
```

[Source](https://github.com/nmaro/graphql-mongodb-example/blob/master/src/start.js)

# Client usage

## Core operations

use myDatabase; db.dropDatabase();
Drops database "myDatabase"

db.customers.remove({});
Truncates collection

db.customers.drop();
Drops collection

show dbs, show collections, show users, show roles
shows existing databases, collections, users, or roles

use mydbname
uses database mydbname, creating it if it does not exist

db
echos out currently used database name

load(filename)
Loads commands from JS file

```
db.createUser({
	user: "myname",
	pwd: "1234",
	roles: ["readWrite", "dbAdmin"]
});
```
Creates db user

db.createCollection("collectionName");
Creates a "table"
	
show collections
Shows collections in current db

## Read documents

db.customers.find();	
Returns all records in customers collection

db.books.find({"title":"Treasure Island"}, {title:true, category:true, _id:false});
Returns only the columns title and category.

db.customers.find({firstName: "John"});
Returns all records in customers collection where first name field is "John".

db.customers.find($.or:[{firstName: "John"}, {firstName: "Mary"}]);
Returns all records in customers collection where first name field is "John" or "Mary".

db.customers.find({age: {$lt: 40}});
Returns all records in customers collection where age is less than 40.

db.customers.find({age: {$gte: 40}});
Returns all records in customers collection where age is greater than or equal to 40.

db.customers.find({age: {$ne: 40}});
Returns all records in customers collection where age is not 40.

db.customers.find({age: {$in: [40, 42, 44]}});
Returns all records in customers collection where age is 40, 42 or 44.

db.customers.find({age: {$nin: [40, 42, 44]}});
Returns all records in customers collection where age is not 40, 42 or 44.

db.customers.find({"address.city": "Boston"});
Returns all records in customers collection where nested value is "Boston".

# Left join

```
dbo.collection('orders').aggregate([
	{
		$lookup: {
			from: 'products',
			localField: 'product_id',
			foreignField: '_id',
			as: 'orderdetails'
		}
	}
])
```

# Cursor operations

db.customers.find().pretty();
Returns results, formatted

db.customers.find().sort({name: 1});
Returns results, sorted

db.customers.find().sort({name: -1});
Returns results, sorted in reverse

db.customers.find().count();
Returns number of documents in the customers collection

db.customers.find().skip(4);
Skips the first 4 records

db.customers.find().limit(4);
Returns first 4 documents in customers collection.

db.customers.find().forEach(customer => print("The name is " + customer.forename));
Iterates records performing programmatic mutation.

# Insert documents

db.customers.insert({firstName: "John", lastName: "Doe"});
Inserts a document into the customers collection

db.customers.insert([{a: 1}, {a: 2}, {a: 3}]);
Inserts multiple documents

# Update documents

db.customers.update({firstName: "John"}, {firstName: "Johnny"});
Updates all records in customers collection where first name field is "John" to have a first name of "Johnny". Full replacement.

db.customers.update({firstName: "John"}, {$set{firstName: "Johnny"}});
Updates all records in customers collection where first name field is "John" to have a first name of "Johnny". Only replaces specified fields.

db.customers.update({firstName: "John"}, {firstName: "Johnny"}, {upsert: true});
Updates all records in customers collection where first name field is "John" to have a first name of "Johnny". Full replacement. Creates a single record when no records exist.

db.customers.update({firstName: "John"}, {$rename: {firstName: "forename"}});
Rename firstName field to forename field in all records where firstName is "John".

db.customers.update({firstName: "John"}, {$inc{age: 4}});
Increments age field of all customers with firstName of "John" by 4.

db.customers.update({firstName: "John"}, {$unset{age: true}});
Removes age field of all customers with firstName of "John".

# Delete documents

db.customers.remove({firstName: "John"});
Removes all documents from customers collection where firstName field is "John".

db.customers.remove({firstName: "John"}, {justOne: true});
Removes all documents from customers collection where firstName field is "John", but limits number of deletions to 1.

## Indexes

Create an index
Type 1 means ascending; -1 means descending
db.books.createIndex({title:1})

db.books.createIndex({isbn:1},{unique:true})
Create a unique index

db.books.createIndex({title:1, author:-1})
Create a index on multiple fields

db.books.getIndexes()
Show all indexes in a collection

db.books.dropIndex({author:-1})
Drop an index

db.books.stats()
Show index statistics