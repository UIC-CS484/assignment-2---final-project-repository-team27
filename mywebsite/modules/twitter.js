// import TwitterClient from 'twitter-api-client';
const twitter = require('twitter-api-client');


const twitterClient = new twitter.TwitterClient({
  apiKey: process.env.TWITTER_API_KEY,
  apiSecret: process.env.TWITTER_API_KEY_SECRET,
  accessToken: process.env.TWITTER_API_ACCESS_TOKEN,
  accessTokenSecret: process.env.TWITTER_API_ACCESS_TOKEN_SECRET,
});

const getTrends = async () => {
    const data = await twitterClient.trends.trendsAvailable();
    return data;
}

const getTweets = async (screen_name) => {
    const data = await twitterClient.accountsAndUsers.usersShow({screen_name: screen_name});
    // console.log(data);
    return data;
}

module.exports = {getTrends, getTweets}

