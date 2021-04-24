# Information

The following characters must be escaped when used as literals: `^ $ \ . * + ? ( ) [ ] { } |`

```
// Literals
/homer/ // Match homer
/bart/ // Match bart
/homer|bart/ // Match homer or bart
/^homer$/ // Match a string that is exactly homer.

// Specials
/./ // Any character (except newline)
/\w/ // A word character (alphanumeric, digit, or _)
/\d/ // A numeric digit character
/\s/ // A whitespace character (tab or space)
/\W/ // Not a word character (alphanumeric, digit, or _)
/\D/ // Not a numeric digit character
/\S/ // Not a whitespace character (tab or space)
/\t/ // Tab
/\r/ // Carridge return
/\n/ // Line feed


// Character classes
//[] // Character class
//[acef] // Matches a, c, e, or f character.
//[0-9a-f] // Matches any of the following characters 0123456789abcdef
//[^0-9a-f] // Matches any characters that are not the following: 0123456789abcdef

// Quantifiers
/a{5}/ // Match five
/a{3,}/ // Match 3 or more
/a{3, 5}/ // Match 3 - 5
/a*/ // 0 or more
/a+/ // 1 or more
/a?/ // 0 or 1
```

# Useful patterns

The following characters must be escaped when used as literals: `^ $ \ . * + ? ( ) [ ] { } |`

```
// Date in dd/mm/yyyy format
/^(0?[1-9]|[12][0-9]|3[01])([ \/\-])(0?[1-9]|1[012])\2([0-9][0-9][0-9][0-9])(([ -])([0-1]?[0-9]|2[0-3]):[0-5]?[0-9]:[0-5]?[0-9])?$/

// Time in 24-hour format, HH:MM
/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/

// Time in 24-hour format, HH:MM:SS
/(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/

// Hex colour
/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/

// Html tags (allows attributes too)
/<\/?[\w\s]*>|<.+[\W]>/

// Email address, quite lenient
/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/
```