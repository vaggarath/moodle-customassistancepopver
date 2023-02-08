# Custom assistance popover

This snippet's ambition is to bypass the assistance popover (question mark button in the footer) without touching the core code.

## Requisites

- Moodle 4.x
- Boost child theme
- Grunt

## What it offers

- Prevent disconnected users and guests to access the assistant
- When a student is answered to contact his / her teacher he gets the list of teachers of the course he/she is on (if)
- Distinction between teachers and student for questions by analysing if the user is a teacher anywhere on the moodle.

## What isn't on this snippet

CAS authentification for the contact form to prevent unwanted spam

## How to install

Copy the files on your child theme
run "grunt amd --force"
(one error for a if/else statement without curly braces which they still don't know about ^^)

### Before

![preview](./original.png "preview 1")

### After

![preview](./newway.png "preview 1")
![preview](./studentsquestions.png "preview 1")
