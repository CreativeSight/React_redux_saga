export const getSortedData = (state) => {

    //Concat users data into single object
    let concatUsers = []; 

        [...state].map((user) => {
            let id = 1;
            for(let key in user) {
                for(let word in user[key]) {
                    concatUsers = [...concatUsers, {id: id, word: word, stats: user[key][word]}];
                    id++;
                 }
            }
          })
console.log(concatUsers)
        //Merge duplicated objects
        const result = concatUsers.reduce((result, item) => {
            const existing = result.find(x => x.word === item.word);
            
            if (existing) {
               existing.stats += item.stats;
            } else {
              result.push(item);
            }
            
            return result;
          }, []);
console.log(result)
        //Sort object stats
        let sortedData = result.sort((a, b) => {
          return b.stats - a.stats;
        });
    console.log("sortuj", sortedData)
    return sortedData;
  };