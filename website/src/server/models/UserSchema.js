// const express = require('express');
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
})

// const User = mongoose.model('collectionName',UserSchema)
const User = mongoose.model('transcript',UserSchema)


module.exports = User;