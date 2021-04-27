# Vela personal organiser

## Summary

Vela is a personal organiser designed to be kept locally and run from the command line. It contains functionality related to organising the following entity types:

* Articles (AKA journal entries)
* Passphrases (which are not encrypted for now, apologies to the heavily reverent among us)
* Contacts

It also features:

* A GUI mode that can be run with the command `vela self:startgui`, to start a parcel devserver process for serving HTML.
* A static HTML passthrough in the GUI interface for navigating through HTML files (particularly useful for storing client-side experiments and recipies for the frontend developer).
* A calendar function to warn you of upcoming birthdays.

## Installation

1. Install NodeJS if you do not have it already. You will need at least version 14.13.0, otherwise it will not work!

2. Install ArangoDB and ensure the db server is running, if you do not have it already.

3. Create a database in ArangoDB for the app to use.

4. Clone the vela repo.

5. Install the app dependencies by running `npm i` from the root directory of the cloned repo.

6. Adjust the `app/config.js` file to use your own database credentials. You may also change the GUI HTTP ports if you wish.

7. Add an alias in your `~/.bashrc` or equivalent:

```
function vela() {
	node /home/kohl/Desktop/bay/system/custom-programs/vela/app/index.js "$@" 
} 
```

8. Run the bootstrap command. This will create the necessary db collections and will also insert some sample content. It looks like this:

`vela self:bootstrap`

## Usage

Vela accepts commands in the form of:

`vela moduleName:functionName arg1=val1 arg2=val2 arg3=val3`

To see a full list of available commands, and the arguments they take, simply run `vela` without any arguments.

CLI parameters are always coerced with a sensible algorithm, based on their value. For example in this fictitious command, the arg would be evaluated as a boolean:

`vela moduleName:functionName arg1=true`

In the following command, the value would be evaluated as a number

`vela moduleName:functionName arg1=123`

You can force coercion by prefixing values like so:

`vela moduleName:functionName arg1=string:123`

Arguments may also accept file paths, and when this feature is used, the value of the argument is the contents of the (plain text) file you have specified with the path.

`vela moduleName:functionName arg1=file:/tmp/my-file.txt`

The above command feature is useful when creating things with long bodies of text, such as articles. For example:

`vela article:create title="Why I hate iOS" body=file:/home/bill-gates/ios-article.txt`

Remember that you can always start the GUI and use Vela through your browser if you want a more visual experience. To do this, run:

`vela self:startgui`

...and then visit `localhost:4000` (or whatever you changed the port to).

Lastly, note that there are some handle little functions for backing up and restoring your data:

`vela self:dump`

`vela self:restore`

## Troubleshooting

If you experience issues with running vela, try the following:

* Reinstall node modules. This can be done by deleting the `node_modules` directory and the `package-lock.json` file, and then re-running `npm i`.
* If the GUI will not start then this is likely an issue with parcel.js. Try this command: `UV_THREADPOOL_SIZE=64 && vela self:startgui`.

# Technical information

Vela was built very quickly and is an attempt to get a primarily command-line-based personal organiser - that has a reasonably nice and intuituve command-line interface - up and running ASAP.

It features a very simple but adequate runtime typing system based on the notion of object shapes and built-in objects acting as type symbols.

The artitecture mostly hangs around a conceptual skeleton of models, commands, and the afore-mentioned typing system.

The GUI is simple and stripped back...but easy to theme ;o)

The app is built upon the following technologies:

* Node
* Express
* React
* SASS
* Parcel
* ArangoDB
* Gluten-free Nutribrex
