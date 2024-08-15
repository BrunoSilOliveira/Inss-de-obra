

const Botao_Calcular = document.getElementById('Calcular')
const resultadoLabel = document.getElementById('resultadoLabel')

Botao_Calcular.addEventListener('click',function(){
     fetch('./dados.json')
     .then(response => response.json())
     .then(dados => {
          let resultado_dados
          let percentual_de_equivalencia 
          let porcentagem_rmt
          let fator_social
          let porcentagem_usinado
          let cod_sobre_usinado
          let reducao_usinado  
          
          let valor_area_complementar_coberta = document.getElementById('valor_area_complementar_coberta').value
          let valor_area_complementar_descoberta = document.getElementById('valor_area_complementar_descoberta').value
          let estado = document.getElementById('Estado').value 
          let vau = document.getElementById('vau').value
          let concreto_usinado = document.getElementById('concreto_usinado').value
          let area_construcao = document.getElementById('area_construcao').value
          let tipo_de_construcao = document.getElementById('tipo_construcao').value
          let tipo_material_de_construcao = document.getElementById('tipo_material').value

          if (concreto_usinado == 's'){     
               let resultado_dados = dados.find(iten => iten.estado == estado)
               
               if (tipo_de_construcao == 'u'){
                    porcentagem_usinado = resultado_dados['RESIDENCIAL UNIFAMILIAR']
               }else if (tipo_de_construcao == 'm'){
                    porcentagem_usinado = resultado_dados['RESIDENCIAL MULTIFAMILIAR']
               }else if (tipo_de_construcao == 'c'){
                    porcentagem_usinado = resultado_dados['COMERCIAL- SALAS E LOJAS']
               }else if (tipo_de_construcao == 'g'){
                    porcentagem_usinado = resultado_dados['GALPÃO INDUSTRIAL']
               }else{
                    porcentagem_usinado = resultado_dados['PROJETO DE INTERESSE SOCIAL']
               }
          }


          if (tipo_de_construcao == 'u'){
               if (area_construcao > 1000){
                    percentual_de_equivalencia = 0.85
               } else {
                    percentual_de_equivalencia = 0.89
               }
          }else if (tipo_de_construcao == 'm'){
               if (area_construcao > 1000){
                    percentual_de_equivalencia = 0.86
               }else{
                    percentual_de_equivalencia = 0.90
               }
          }else if (tipo_de_construcao == 'c'){
               if (area_construcao > 3000){
                    percentual_de_equivalencia = 0.83
               }else{
                    percentual_de_equivalencia = 0.86
               }
          }else if(tipo_de_construcao == 'g'){
               percentual_de_equivalencia = 0.95
          }else if(tipo_de_construcao == 'cp'){
               percentual_de_equivalencia = 0.98
          }else{
               percentual_de_equivalencia = 0.98
          }

          let area_de_equivalencia = area_construcao * percentual_de_equivalencia

          if (valor_area_complementar_coberta > 0){
              let valor_desconto = valor_area_complementar_coberta * 0.5
              area_de_equivalencia -= valor_desconto 
          }

          if (valor_area_complementar_descoberta > 0){
               let valor_desconto = valor_area_complementar_descoberta * 0.75
               area_de_equivalencia -= valor_desconto
          }
          
          let cod = vau * area_de_equivalencia

          if (area_construcao >= 0 && area_construcao <= 100){
               fator_social = cod * 0.2
          }else if(area_construcao >= 100.01 && area_construcao <= 200){
               fator_social = cod * 0.4
          }else if(area_construcao >= 200.01 && area_construcao <= 300){
               fator_social = cod * 0.55
          }else if(area_construcao > 300.01 && area_construcao <= 400){
               fator_social = cod * 0.7
          }else{
               fator_social = cod * 0.9
          }


          if (tipo_material_de_construcao == 'A'){
               porcentagem_rmt = 0.2
          }else{
               porcentagem_rmt = 0.15
          }

          let valor_rmt = porcentagem_rmt * fator_social
          if (concreto_usinado == 's'){
               cod_sobre_usinado = cod * porcentagem_usinado
               reducao_usinado = cod_sobre_usinado * 0.05
               valor_rmt = valor_rmt - reducao_usinado
          }



          let inss_patronal = valor_rmt * 0.2
          let inss_segurados =  valor_rmt * 0.08
          let inss_rat = valor_rmt * 0.03
          let inss_terceiros = valor_rmt * 0.058

          let inss_total = inss_patronal + inss_segurados + inss_rat + inss_terceiros


          resultadoLabel.textContent = inss_total.toLocaleString('pt-BR',{style: 'currency',currency: 'BRL'})
     })
})