import fs from 'fs/promises';
import supabase from './supabase.js';
const postsData = JSON.parse(await fs.readFile('questions.json', 'utf8'));

async function insertPostsWithTags() {
    try {
        const postsData = JSON.parse(await fs.readFile('questions.json', 'utf8'));

        for (const post of postsData) {
            const { uid, content, tags } = post;

            const { data: postData, error: postError } = await supabase
                .from('posts')
                .insert({ uid, body: content })
                .select('post_id')
                .single();

            if (postError) {
                console.error('Error adding post:', postError);
                continue;             }

            const postId = postData.post_id;

            for (const tagName of tags) {

                const { data: tagData, error: tagError } = await supabase
                    .from('tags')
                    .select('tag_id')
                    .eq('name', tagName)
                    .single();

                let tagId;
                if (tagError || !tagData) {
                   
                    const { data: newTagData, error: newTagError } = await supabase
                        .from('tags')
                        .insert({ name: tagName })
                        .select('tag_id')
                        .single();

                    if (newTagError) {
                        console.error('Error adding Tag:', newTagError);
                        continue; 
                    }

                    tagId = newTagData.tag_id;
                } else {
                    tagId = tagData.tag_id;
                }

                const { error: postTagError } = await supabase
                    .from('post_tags')
                    .insert({ post_id: postId, tag_id: tagId });

                if (postTagError) {
                    console.error('Error linking tag to post:', postTagError);
                }
            }
        }

        console.log('Posts and tags linked successfully!');
    } catch (err) {
        console.error('Error in insertPostsWithTags:', err);
    }
}

insertPostsWithTags();
