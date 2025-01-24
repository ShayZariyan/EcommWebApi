const bcrypt=require('bcrypt');
const pass="123456";
const rounds=10;
bcrypt.hash(pass,rounds,(err,hashPass)=>{
if(err)
console.log(err.message);
else
console.log(hashPass);
});
const hashFromDB="$2b$10$O9IjDRbV5zl569aZXxTaSu2mPrIcncpe8DlMUxe0EBZZNlN8t57Mi";
bcrypt.compare(pass,hashFromDB).then((ans)=>{
    if(ans)
        console.log(`ok`);
        else
        console.log(`not ok`);
});