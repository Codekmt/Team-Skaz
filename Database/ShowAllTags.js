const supabase = require('./supabase.js'); 

async function fetchAllTags() {
    const { data, error } = await supabase.rpc('get_all_tags');

    if (error) {
        console.error('Error fetching tags:', error);
        return;
    }

    console.log('Tags:', data);
    return data; 
}

fetchAllTags();
