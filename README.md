API practice(GET, POST, PATCH, DELETE)

注意:
1. 何時使用find()，何時使用findIndex()，使用邏輯可以思考一下，沒有找尋到對應的資料或index時會回傳-1，可用於邏輯判斷
2. res.status()，200、201、404要依情況加入，容易忘記這項
3. req.params與req.query資料的使用，要多加練習
4. .push()與.splice() 要記得

git注意:
1. 初期建置沒什麼問題
2. 在使用git push origin main/master前，要先使用git log確定commit碼後面的資訊
   (HEAD:main/master) => git push origin HEAD:main/master
   (origin/main/master) => git push origin main/master
