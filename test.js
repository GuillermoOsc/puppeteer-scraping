puppe = require('puppeteer')            
axios = require('axios')                
inicio() 



async function inicio(){

    // muestra el navegador en la pantalla
  browser = await puppe.launch({headless:false})        
                                                    
    // nueva página en el navegador (Chrome)
   pagina = await browser.newPage()

    // Indicar que vamos a abrir en el navegador la página de dolarsi.com …
    await pagina.goto('https://www.dolarsi.com.ar/func/tool4.php')
   
   //  scraping - Me llevo el valor del elemento ‘#v1’ de la página
    var valorweb = await pagina.evaluate( ( ()=>{                   
                     return document.querySelector('#v1').innerText 
      }))                                                           
    valorweb = valorweb.replace('$ ','')
    console.log("Valor Web:" + valorweb)    
                            


// Detengo el programa 1 segundos para poder ver como quedó la pantalla del // navegador    
    setTimeout( ()=> {                     
                    browser.close()        
                    }, 1000)                
                   
//Datos de la API 
axios.get('https://www.dolarsi.com/api/api.php?type=valoresprincipales')// llamo a la api por GET con su url
.then(response =>{                                                      
        datos = response.data                        
        nombre = datos[0].casa.nombre               
        valorapi = datos[0].casa.venta                
        console.log("Valor Api: " + valorapi)       
        console.log(response.status)                                 
        if(valorapi == valorweb){                                       
            console.log("Las valuaciones son correctas") 
        }else{                                                
            console.log("Error de aserción")  // funcional              
        }
    })
.catch(error => {                                                       
        console.log(error.response.status)  // No funcional             
    })
} // cierro la función inicio