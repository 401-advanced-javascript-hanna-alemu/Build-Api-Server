'use strict';

class Model {

  constructor(schema) {
    this.schema = schema;
  }

  
  create(record) {
    console.log('r',record);
    let newRecord = new this.schema(record);
    console.log('n', newRecord);
    return newRecord.save();
  }

  read( id ) {
    if( id ) {
      return this.schema.find({});
    }
    else {
      return this.schema.find( {} )
        .then( results => {
          return {
            count: results.length,
            results: results,
          } ;
        });
    }
  }

  update(id, record) {
    if( id ) {
      return this.schema.findByIdAndUpdate(id, record, { new: true });
    } else return 'update: note found';
  }

  delete(id) {
    if( id ) {
      return this.schema.findByIdAndDelete(id);
    }
    else return 'delete: not found';
  }
}

module.exports = Model;
