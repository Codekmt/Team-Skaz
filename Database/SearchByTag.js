// import supabase from './supabase.js';
const supabase = require('./supabase.js'); 

async function searchQuestionsByTag(tagName, startDate = null, endDate = null) {
  try {
    const { data, error } = await supabase
      .rpc('search_by_tag', {
        tag_name: tagName,  
        start_date: startDate,  
        end_date: endDate, 
      });

    if (error) {
      console.error('Error calling the function:', error);
      return;
    }

    console.log('Results:', data);
    return data;  

  } catch (err) {
    console.error('Error in search function:', err);
  }
}

module.exports = searchQuestionsByTag;

// Test de functie (optioneel)
searchQuestionsByTag('carbon neutral', '2024-01-01', '2024-12-31');
