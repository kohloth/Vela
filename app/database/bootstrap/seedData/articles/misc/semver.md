# Information

Semver syntax is: MAJOR.MINOR.PATCH

* Major update = Breaking changes
* Minor update = Backwards compatible (additional features)
* Patch update = Backwards compatible (bug fixes)

## Sample usage

| Version string            | Meaning                                                                    | Example matches                                   |
|---------------------------|----------------------------------------------------------------------------|---------------------------------------------------|
| `1.2.3` `=1.2.3` `v1.2.3` | Exactly 1.2.3.                                                             | `1.2.3`                                           |
| `>1.2.3`                  | Greater than 1.2.3.                                                        | `1.2.4` `1.2.5` ` 1.2.18` `1.3.0` `2.4.1`         |
| `<1.2.3`                  | Less than 1.2.3.                                                           | `1.2.2` `1.2.0` `0.1.0`                           |
| `>1.2.3`                  | Greater than or equal to 1.2.3.                                            | `1.2.3` `1.2.4` `1.2.5` ` 1.2.18` `1.3.0` `2.4.1` |
| `<1.2.3`                  | Less than or equal to 1.2.3.                                               | `1.2.3` `1.2.2` `1.2.0` `0.1.0`                   |
| `>=1.2.3 <2.4.8`          | Greater than or equal to 1.2.3, but less than 2.4.8.                       | `1.2.3` `1.2.5` `2.3.1` `2.4.7`                   |
| `1.2.7 || >=1.2.9 <2.0.0` | 1.2.7, or: any version greater than or equal to 1.2.9 and less than 2.0.0  | `1.2.7` `1.2.9` `1.2.24` `1.5.4` `1.9.24`         |
| `~1.2.3`                  | Anything strongly close to 1.2.3. Allows the patch number to change.       | `1.2.3` `1.2.4` `1.2.5` `1.2.18` `1.2.206`        |
| `^1.2.3`                  | Anything weakly close to 1.2.3. Allows the minor version number to change. | `1.2.3` `1.2.4` `1.3.2` `1.3.8` `1.23.43`         |
| `1.2.x` `1.2.*`           | Any version that begins with `1.2.`. Similar to `~1.2.3`.                  | `1.2.3` `1.2.4` `1.2.5` `1.2.18` `1.2.206`        |
