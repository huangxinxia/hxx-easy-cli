#!/usr/bin/env node
const easyGit = require('hxx-easy-git')
const inquirer = require('inquirer')
const handlebars = require('handlebars')
const fs = require('fs')
let yargs = require('yargs')
    .command('create', 'create program by easy-cli!',
        {
            'name':{
                alias:'n',
                default:'default-name'
            },
            'mould':{
                alias:'m',
                default:'default'
            }
        },
        function (argv) {
            inquirer.prompt([
                {
                    type:'input',
                    name:'author',
                    message:'作者:'
                },
                {
                    type:'input',
                    name:'version',
                    message:'版本:',
                    default:'1.0.0'
                },
                {
                    type:'input',
                    name:'description',
                    message:'描述:'
                }
            ]).then((answers) => {
                let url = ''
                if(argv.mould == 'less'){
                    url = 'https://github.com/huangxinxia/model-less.git'
                }
                console.log('模板下载中...')
                easyGit({'repo':url, 'tar':argv.name, 'clone':true}, function (err) {
                    if(err){
                        console.log(err)
                    }else {
                        const meta = {
                            name: argv.name,
                            description: answers.description,
                            author: answers.author,
                            version: answers.version
                        }
                        const fileName = `${argv.name}/package.json`;
                        const content = fs.readFileSync(fileName).toString();
                        const result = handlebars.compile(content)(meta);
                        fs.writeFileSync(fileName, result);
                        console.log('下载成功！')
                    }
                })
            })
        })
    .help()
    .argv

