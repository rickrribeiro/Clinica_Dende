const axios = require('axios')
const backup = require('./helpers/backupDB')

describe('POST routes', () =>{
  beforeAll(() => {
   backup.backupDB()
  });
  
    it('create rule ', (done) =>{ //create rule test
        axios({
            url: 'http://localhost:8000',
            method: 'post',
            data: {
              query: `
              mutation{
                createRule(day:"98-12-2020", intervals:[
                    {start:"22:00" end:"23:00"},
                     {start:"21:00" end:"22:00"},
                    ]){
                  id
                }
              }
                `
            }
          }).then((result) => {
           expect(result.data.errors).toBe(undefined) // verify if there is any erros
           
            done()
          });
    })
  

})
