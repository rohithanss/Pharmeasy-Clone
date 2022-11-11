import {apall} from '../components/Healthapend.js'
import {navbar} from '../components/tlnavbar.js'
let nav = document.getElementById("navbar")
nav.innerHTML = navbar()
const fetch_data = async()=>{
    const response = await fetch("http://localhost:1010/admin/monu")
    const refine_data = await response.json()
    apall(refine_data.Lab_Tests[0].Health_Packages)
   console.log(refine_data.Lab_Tests[0])
}
fetch_data()