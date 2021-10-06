let imgFiles = document.getElementById('img-files');
let imgHolder = document.getElementById('imageschosen');
let numOfFiles = document.getElementById('numofimg');
form = document.getElementById("myform");
usrid = document.getElementById("userid").value;

// local dev
// var web_url = "http://localhost:5000"

// prouction
var web_url = "https://pg-api-app.herokuapp.com"


imgFiles.addEventListener("change", (e) => {
    console.log(usrid)
    files = e.target.files;
    console.log(files);
    
    imgHolder.innerHTML = "";
    numOfFiles.textContent = `${imgFiles.files.length} Images Selected`;

    for (i of imgFiles.files) {
        let reader = new FileReader();
        let figure = document.createElement('figure');
        let figCaption = document.createElement('figCaption');

        figCaption.innerText = i.name;
        figure.appendChild(figCaption);

        reader.onload=() =>{
            let img = document.createElement("img");
            img.setAttribute('src', reader.result);
            figure.insertBefore(img,figCaption);
        }
        imgHolder.appendChild(figure);
        reader.readAsDataURL(i);
    }
});


form.addEventListener("submit", async (e)=>{

e.preventDefault()

console.log("it passes");
document.getElementById('loader2').style.visibility = 'visible';



    const Apartment_Name = document.getElementById("Apartment_Name").value;
    const Location = document.getElementById("Location").value;
    const Owner_Name = document.getElementById("Owner_Name").value;
    const Owner_Contact = document.getElementById("Owner_Contact").value;
    const Owner_Email = document.getElementById("Owner_Email").value;
    const Description = document.getElementById("Description").value;
    const Deposit = document.getElementById("Deposit").value;
    const Notice_Period = document.getElementById("Notice_Period").value;
    const Accommodation = document.getElementById("Accommodation").value;
    const Maintenance = document.getElementById("Maintenance").value;
    const Electricity_Charges = document.getElementById("Electricity_Charges").value;
    const Food_Availabilty = document.getElementById("Food_Availabilty").value;
    const Parking = document.getElementById("Parking").value;
    const Power_Backup = document.getElementById("Power_Backup").value;
    const AC_Rooms = document.getElementById("AC_Rooms").value;
    const No_of_Beds = document.getElementById("No_of_Beds").value;
    
    var FILES = []
        const myfile = document.querySelector("#img-files").files;
        console.log(myfile)
        
        const ref = firebase.storage().ref()
        for (let i = 0; i < myfile.length; i++) {
            
            const file = document.querySelector("#img-files").files[i];
            const name = `images/${usrid}/${String(Date.now())}_${i+1}`
            const metadata = {
                    contentType : file.type
                }
                const task = await ref.child(name).put(file, metadata);
    
                const url = await task.ref.getDownloadURL()
    
                console.log(url)
    
                FILES.push(url)   
        }
        console.log(FILES)
        
         try{
        const Data = await axios.post(`${web_url}/api/posts`, {
            Apartment_Name : Apartment_Name,
            Location : Location,
            Owner_Name : Owner_Name,
            Owner_Contact : Owner_Contact,
            Owner_Email : Owner_Email,
            Description : Description,
            Deposit : Deposit,
            Notice_Period : Notice_Period,
            Accommodation : Accommodation,
            Maintenance : Maintenance,
            Electricity_Charges : Electricity_Charges,
            Food_Availabilty : Food_Availabilty,
            Parking : Parking,
            Power_Backup : Power_Backup,
            AC_Rooms : AC_Rooms,
            No_of_Beds : No_of_Beds,
            img_url : FILES
        });
        console.log(Data.data)
        location.replace(`${web_url}/home`);
    }catch(err){
        console.log(err)
    }

});