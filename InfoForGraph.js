var GitHubApi = require('github')
var github = new GitHubApi({
  debug: true
})

var fs = require('fs');
var csv = require('fast-csv');
var ws = fs.createWriteStream('GraphData.csv');

var dateArray1 = []
var dateArray2 = []

github.repos.getCommits({
      owner: 'kellya73',
      repo:  'Github-API-Interrogation'
}
,function (err, res)
{
        if (err) throw err
        for (x=0; x<res.data.length; x++)
        {
              var commitDate = res.data[x].commit.author.date.substring(0, 10);
              var convertedDate = convertDate(commitDate)
              dateArray1[x] = convertedDate
              if (dateArray2.indexOf(convertedDate) <= (-1))
              {
                    dateArray2.push(convertedDate)
              }
        }

        var count = []
        var headers = [2]

        for(y=0; y<dateArray2.length; y++)
        {
              var number = countTimes(dateArray1, dateArray2[y])
              count.push(number)
        }
        headers[0] = "Date"
        headers.push("Commits")
        var arrayForcsv = []
        for(z=0; z<count.length; z++)
        {
              var tempArray = [2]
              tempArray[0] = dateArray2[z]
              tempArray.push(count[z])
              arrayForcsv.push(tempArray)
        }
        arrayForcsv.push(headers)
        arrayForcsv.reverse()
        csv.write( arrayForcsv  ,  {header:true})  .pipe(ws);
})

function convertDate(date){
    var month = date.substring(5,7)
    switch(month) {
    case "1":
        month = "01"
        break;
    case "2":
        month = "02"
        break;
    case "3":
        month = "03"
        break;
    case "4":
        month = "04"
        break;
    case "5":
        month = "05"
        break;
    case "6":
        month = "06"
        break;
    case "7":
        month = "07"
        break;
    case "8":
        month = "08"
        break;
    case "9":
        month = "09"
        break;
    case "10":
        month = "10"
        break;
    case "11":
        month = "11"
        break;
    case "12":
        month = "12"
        break;
    default:
        console.log("Date error")
}

    var year = date.substring(2,4)
    var day = date.substring(8,10)
    var convertedDate = day + "/" + month + "/" + year
    return convertedDate;
}

// Function to count instances of a certain string in a particular array.
function countTimes(array, string){
    var y = 0
    for (x=0; x<array.length; x++){
          if (array[x] == string){
                y++;
          }
    }
    return y
}
