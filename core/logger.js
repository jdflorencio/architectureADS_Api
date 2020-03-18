
'use strict';

class Logger {

    add(message) {
        console.log('ADICIONOU >>', message)
    }

    edit(message) {
        console.log('EDITOU >>', message)
    }

    remove(message) {
        console.log('REMOVEU >>', message)
    }

    update(message) {
        console.log('ATUALIZOU >>', message)
    }
}

class SingletonLogger {
    static _instance

    static _createInstance() {
        const logger = new Logger()
        return logger
    }

    static getInstance() {
        if (!this._instance) {
            this._instance = this._createInstance()
        }

        return this._instance
    }
}

exports.module = new SingletonLogger()