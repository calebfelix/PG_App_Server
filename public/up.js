

async function upload(){
    

    const myfile = document.querySelector("#img-files").files;

    console.log(myfile)
    var FILES = []
      
    for (let i = 0; i < myfile.length; i++) {

        const ref = firebase.storage().ref()
        const file = document.querySelector("#img-files").files[i];
        const name = `images/${file.name}`
        const metadata = {
                contentType : file.type
            }
            const task = await ref.child(name).put(file, metadata);

            const url = await task.ref.getDownloadURL()

            console.log(url)

            FILES.push(url)
    }
    console.log(FILES)
}