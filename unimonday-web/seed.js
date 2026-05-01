import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Note: To bypass RLS and strictly seed, you'd typically need the service role key, but the schema has RLS disabled.
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  console.log('Seeding Nursery University curriculum...');

  try {
    // 1. Create a Module
    const { data: moduleData, error: moduleError } = await supabase
      .from('modules')
      .insert([{
        title: 'Semester 1: Foundation',
        description: 'Basic sounds, animals, and colors to build a strong foundation.',
        level: 'First Words',
        order_index: 1,
        icon_name: 'star'
      }])
      .select()
      .single();

    if (moduleError) throw moduleError;
    console.log(`Created Module: ${moduleData.title}`);

    // 2. Create Lessons
    const { data: lessonsData, error: lessonsError } = await supabase
      .from('lessons')
      .insert([
        {
          module_id: moduleData.id,
          title: 'Week 1: Friendly Animals (Speaking)',
          type: 'Speaking',
          order_index: 1
        },
        {
          module_id: moduleData.id,
          title: 'Week 1: Friendly Animals (Writing)',
          type: 'Writing',
          order_index: 2
        }
      ])
      .select();

    if (lessonsError) throw lessonsError;
    const speakingLessonId = lessonsData.find(l => l.type === 'Speaking')?.id;
    const writingLessonId = lessonsData.find(l => l.type === 'Writing')?.id;

    console.log(`Created 2 Lessons for Module`);

    // 3. Create Vocabulary
    const vocabularyItems = [
      {
        lesson_id: speakingLessonId,
        word: 'cat',
        image_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=400&auto=format&fit=crop', // Cat
        pronunciation_target: 'cat',
        spelling_target: 'cat'
      },
      {
        lesson_id: speakingLessonId,
        word: 'dog',
        image_url: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=400&auto=format&fit=crop', // Dog
        pronunciation_target: 'dog',
        spelling_target: 'dog'
      },
      {
        lesson_id: speakingLessonId,
        word: 'bird',
        image_url: 'https://images.unsplash.com/photo-1522926193341-e9eb1b36bb86?q=80&w=400&auto=format&fit=crop', // Bird
        pronunciation_target: 'bird',
        spelling_target: 'bird'
      },
      {
        lesson_id: writingLessonId,
        word: 'cat',
        image_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=400&auto=format&fit=crop',
        pronunciation_target: 'cat',
        spelling_target: 'cat'
      },
      {
        lesson_id: writingLessonId,
        word: 'dog',
        image_url: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=400&auto=format&fit=crop',
        pronunciation_target: 'dog',
        spelling_target: 'dog'
      }
    ];

    const { error: vocabError } = await supabase
      .from('vocabulary')
      .insert(vocabularyItems);

    if (vocabError) throw vocabError;
    console.log(`Created ${vocabularyItems.length} Vocabulary Items`);

    console.log('✅ Seeding complete!');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();
