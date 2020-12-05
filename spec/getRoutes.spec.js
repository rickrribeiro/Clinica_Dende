const axios = require('axios')

describe('GET routes', () =>{
  
    it('should get all ', (done) =>{ //get all rules test
        axios({
            url: 'http://localhost:4000',
            method: 'post',
            data: {
              query: `
              query{
                rules{
                   id
                   day
                   intervals{
                     start
                     end
                   }
                 }
               }
                `
            }
          }).then((result) => {
           expect(result.data.errors).toBe(undefined) // verify if there is any erros
           
            done()
          });
    })
  
    it('should get rules by interval ', (done) =>{ //get rules by interval test
        axios({
            url: 'http://localhost:4000',
            method: 'post',
            data: {
              query: `
              query{
                rulesByInterval(interval:{start:"07-12-2020",end:"08-12-2020"}){
                  day
                  intervals{
                      start
                      end
                  }
                  
                }
              
              }
                `
            }
          }).then((result) => {
           expect(result.data.errors).toBe(undefined) // verify if there is any erros
           
            done()
          });
    }
)

})
