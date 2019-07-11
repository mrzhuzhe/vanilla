let tree = [
  { n: "5" ,
    child:[{
      n: 6 , child: [
        {
          n: 7, child: [
            {
              n: 16 , child: [
                {
                  n: 17, child: []
                },
                {
                  n: 18, child: []
                },
                {
                  n: 19, child: []
                },
                {
                  n: 20, child: []
                }
              ]
            }
          ]
        },
        {
          n: 8, child: []
        },
        {
          n: 9, child: []
        },
        {
          n: 10, child: []
        }
      ]
    },{
      n: 11 , child: [
        {
          n: 12, child: []
        },
        {
          n: 13, child: []
        },
        {
          n: 14, child: []
        },
        {
          n: 15, child: []
        }
      ]
    }]
  }
];
/*
  5 - 6 - 7 - 16 - 17
                 - 18
                 - 19
                 - 20
        - 8
        - 9
        - 10
    - 11 - 12
         - 13
         - 14
         - 15
 */
console.log("------------- simple tree start --------------");
console.log(`  5 - 6 - 7 - 16 - 17
                 - 18
                 - 19
                 - 20
        - 8
        - 9
        - 10
    - 11 - 12
         - 13
         - 14
         - 15`)
console.log("------------- simple tree end --------------");
module.exports = tree;
