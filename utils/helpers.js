/* 
Helpers allow us to add small bits of logic or data manipulation to the template itself. 
In this case, we want to format data, like dates, from within Handlebars.js. 
To do so, we'll add a custom helper function to the Handlebars.js app.

AND because helpers are essentially just functions, we can actually unit test them.
*/
module.exports = {
  format_date: date => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
      date
    ).getFullYear()}`;
  },
  format_url: url => {
    return url
      .replace('http://', '')
      .replace('https://', '')
      .replace('www.', '')
      .split('/')[0]
      .split('?')[0];
  },
  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }

    return word;
  }
};
