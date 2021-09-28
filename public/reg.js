

form = document.getElementById("reg")


form.addEventListener("submit", (e)=>{
    e.preventDefault();
    

    const Apartment_Name = document.getElementById("Apartment_Name").value;
    const Location = document.getElementById("Location").value;
    const Owner_Name = document.getElementById("Owner_Name").value;
    const Owner_Contact = document.getElementById("Owner_Contact").value;
    const Owner_Email = document.getElementById("Owner_Email").value;
    const Deposit = document.getElementById("Deposit").value;
    const Description = document.getElementById("Description").value;
    const Accommodation = document.getElementById("Accommodation").value;
    const Notice_Period = document.getElementById("Notice_Period").value;

    console.log("submit")
    

     async function sendData() {
         try{
        const Data = await axios.post('http://localhost:5000/api/posts', {
            Apartment_Name : Apartment_Name,
            Location : Location,
            Owner_Name : Owner_Name,
            Owner_Contact : Owner_Contact,
            Owner_Email : Owner_Email,
            Deposit : Deposit,
            Description : Description,
            Accommodation : Accommodation,
            Notice_Period : Notice_Period,
        });
        console.log(Data)
    }catch(err){
        console.log(err)
    }
        
    }

    sendData();

});