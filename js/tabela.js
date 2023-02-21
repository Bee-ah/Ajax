//request da parte de categorias de comida
async function start(){
    const response= await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const data= await response.json();//o await diz que as ações posteriores só  serem realizadas concluido determinado comando
        createList(data.categories)
      }
//chamada da função      
start();
//cria lista de categorias no html
function createList(foodL){  
    let result = foodL.map(a => a.strCategory);
    document.getElementById("foodlist").innerHTML = ` 
    <select id="seletor"  onchange="loadFood(this.value)">
    <option >Choose a type of food</option>
        ${result.map(food => `<option value="${food}" >${food}</option>`).join('')}
    </select>`
}

var nome ={}
//carrega os nomes e fotos de comida
async function loadFood(food){
    if(food != "Choose a type of food"){
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${food}`)
        const data = await response.json()
        console.log(data)
        foodLength = data.meals.length
        var espa = ""
        for(i=0;i < foodLength;i++){
        nome[i]=data.meals[i].strMeal
        espa +="<tr>"
        espa += "<td>" + data.meals[i].strMeal+"</td>";
        espa += "<td> <img src= "+data.meals[i].strMealThumb+"  /> </td>"+"</tr>"
        }
        console.log(nome);
          document.getElementById("food").innerHTML=espa;
    }

}

//evento do botão para mostrar áreas
const loadDescr = document.getElementById('loadDescr')

loadDescr.addEventListener('click', loadDescri());
async  function loadDescri(){
    console.log('Sucess');
    var x = document.getElementById("seletor").value;
    if(x != "")
   {
    var adi = ""
    for(i=0;i<foodLength;i++){
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nome[i]}`,{ method :'POST'})
        const data = await response.json()
        adi += `<tr> <td>${data.meals[0].strArea}</td></tr>`
    }
    document.getElementById("adicional").innerHTML= adi;
}
}


