import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'http://38.97.60.181:8000',
  'eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJyb2xlIjogInNlcnZpY2Vfcm9sZSIsICJpc3MiOiAic3VwYWJhc2UiLCAiaWF0IjogMTcwMDAwMDAwMCwgImV4cCI6IDIwMDAwMDAwMDB9._du8bmlWymA_nhcORn58Br91kDGpCh5h0tn8fsciv0M'
)

async function createAdminUser() {
  const email = 'admin@santamaria.com'
  const password = 'SantaMaria2024!'

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  })

  if (error) {
    console.error('Error creating user:', error.message)
    return
  }

  console.log('Admin user created successfully!')
  console.log('Email:', email)
  console.log('Password:', password)
  console.log('User ID:', data.user.id)
}

createAdminUser()
