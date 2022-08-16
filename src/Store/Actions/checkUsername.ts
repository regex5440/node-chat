export function checkUsernameFromDb(username){
    //Check if username does not exists then return true
   return new Promise(resolve=>{
        setTimeout(()=>{
            resolve(username === 'Harsh');
        },1000);
    });
}