import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import {secret} from '../config/index'
import express from 'express';

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"não pode ficar vazio."]
    },
    email:{
        type:String,
        lowercase:true,
        unique:true,
        required:[true,"não pode ficar vazio."],
        index:true,
        match:[/\S+@\S+\.\S+/,'é invalido']
    },
    loja:{
        type:Schema.Types.ObjectId,
        ref:'Loja',
        required:[true,"não pode ficar vazia."]
    },
    permission:{
        type:Array,
        default:["cliente"]
    },
    hash:String,
    salt:String,
    recovery:{
        type:{
            token:String,
            date:Date
        },
        default:{}
    }
},{ timestamps:true });

UserSchema.plugin(uniqueValidator,{ message:"já está sendo utilizado"});

UserSchema.methods.setSenha = function(password){

    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt,10000,512,"sha512").toString('hex');
};

UserSchema.methods.validaPassword = function(password){
    const hash = crypto.pbkdf2Sync(password, this.salt,10000,512,"sha512").toString('hex');
    return hash === this.hash;
};

UserSchema.methods.createToken = function(){
    const hoje = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate()+15);

    return jwt.sign({
        id:this._id,
        email:this.email,
        exp: parseFloat(exp.getTime() / 3000, 10)
    }, secret);
};

UserSchema.methods.sendAuth = function(){
    return {
        name: this.name,
        email: this.email,
        loja: this.loja,
        role:this.permissao,
        token:this.createToken()
    };
};

//Recovery
UserSchema.methods.createTokenRecoverPassword = function(){
    this.recovery = {};
    this.recovery.token = crypto.randomBytes(16).toString('hex');
    this.recovery.date = new Date( new Date().getTime() +24*60*60*1000 );
    return this.recovery;
};

UserSchema.methods.finalizationTokenRecoverPassword = function(){
    this.recovery = {token:null, date:null };
    return this.recovery;

};

export default mongoose.model('User', UserSchema);



