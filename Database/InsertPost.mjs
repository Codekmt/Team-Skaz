import fs from 'fs/promises';
import supabase from './supabase.js';
import path from 'path';

async function insertPostsWithTags() {
    try {
        const postsData = JSON.parse(await fs.readFile('questions.json', 'utf8'));
        
        const currentDir = path.dirname(new URL(import.meta.url).pathname);
        const commentsFilePath = path.join(currentDir, 'src', 'backend', 'answers.json');
        const commentsData = JSON.parse(await fs.readFile(commentsFilePath, 'utf8'));

        for (const post of postsData) {
            const { id: post_id, content, tags } = post;

            const { data: existingPost, error: existingPostError } = await supabase
                .from('posts')
                .select('post_id')
                .eq('post_id', post_id)
                .single();

            if (existingPostError && existingPostError.code !== 'PGRST100') {
                console.error('Error checking existing post:', existingPostError);
                continue;
            }

            if (!existingPost) {
                const { data: postData, error: postError } = await supabase
                    .from('posts')
                    .insert({ post_id, content })
                    .select('post_id')
                    .single();

                if (postError) {
                    console.error('Error adding post:', postError);
                    continue;
                }
            }

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
                        console.error('Error adding tag:', newTagError);
                        continue;
                    }

                    tagId = newTagData.tag_id;
                } else {
                    tagId = tagData.tag_id;
                }

                const { error: postTagError } = await supabase
                    .from('post_tags')
                    .insert({ post_id, tag_id: tagId });

                if (postTagError) {
                    console.error('Error linking tag to post:', postTagError);
                }
            }

            const postComments = commentsData[post_id];
            if (postComments) {
                for (const comment of postComments) {
                    const { id: comment_id, answer, date, is_correct_answer } = comment;

                    const isAnswer = is_correct_answer ? true : false;

                    const { error: commentError } = await supabase
                        .from('comments')
                        .insert({
                            post_id,
                            comment_id,
                            answer,
                            date,
                            is_answer: isAnswer
                        });

                    if (commentError) {
                        console.error('Error adding comment:', commentError);
                    }
                }
            }
        }

        console.log('Posts, tags, and comments linked successfully!');
    } catch (err) {
        console.error('Error in insertPostsWithTags:', err);
    }
}

insertPostsWithTags();
