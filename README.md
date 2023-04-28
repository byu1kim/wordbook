# Wordbook

A custom vocabulary list for whoever needs to study English

## Technologies

- AWS API Gateway
- AWS Lambda function
- Cockroch DB (PostgreSQL)
- Frontend : React

## Features

- Authentication with Cognito
- Add English and its meaning
- Check if memorized
- Prevent saving duplicated words

## Deployed website

[https://byul-wordbook.netlify.app/](https://byul-wordbook.netlify.app/)

# Todo

- [ ] return value from post lambda : return getall(id) (edit after add right away?)
- [ ] redo : backend aws
- [ ] remove unique contraints from words table, instead, add unique function for the unique id
- [ ] hide english/kor
- [ ] google login
- [ ] search
- [x] stable cognito
- [ ] flash card

- [ ] profile : edit name
- [ ] profile : change password
