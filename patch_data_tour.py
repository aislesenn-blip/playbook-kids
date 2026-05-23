import sys

# Dashboard
with open('unimonday-web/src/app/dashboard/page.tsx', 'r') as f:
    content = f.read()

content = content.replace('''          className="bg-white rounded-[2rem] p-8 shadow-[0_4px_40px_rgba(0,0,0,0.02)] border border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group hover:border-zinc-200 transition-colors cursor-pointer"''', '''          data-tour="up-next"
          className="bg-white rounded-[2rem] p-8 shadow-[0_4px_40px_rgba(0,0,0,0.02)] border border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group hover:border-zinc-200 transition-colors cursor-pointer relative z-[210]"''')

with open('unimonday-web/src/app/dashboard/page.tsx', 'w') as f:
    f.write(content)

# Session
with open('unimonday-web/src/app/session/[id]/page.tsx', 'r') as f:
    content = f.read()

content = content.replace('''        <button
          onClick={() => {
              router.push('/dashboard');
          }}
          className="w-14 h-14 shrink-0 rounded-full bg-[#3A3530]/50 hover:bg-[#FF6B6B]/20 flex items-center justify-center transition-colors border border-[#4A443E]/50 group"''', '''        <button
          data-tour="end-call"
          onClick={() => {
              router.push('/dashboard');
          }}
          className="w-14 h-14 shrink-0 rounded-full bg-[#3A3530]/50 hover:bg-[#FF6B6B]/20 flex items-center justify-center transition-colors border border-[#4A443E]/50 group relative z-[210]"''')

with open('unimonday-web/src/app/session/[id]/page.tsx', 'w') as f:
    f.write(content)

# BottomNav
with open('unimonday-web/src/components/layout/BottomNav.tsx', 'r') as f:
    content = f.read()

content = content.replace('''            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${isActive ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-600'}`}
            >''', '''            <Link
              key={item.href}
              href={item.href}
              data-tour={item.href === '/parent-dashboard' ? 'parent-nav' : undefined}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${isActive ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-600'} ${item.href === '/parent-dashboard' ? 'relative z-[210]' : ''}`}
            >''')

with open('unimonday-web/src/components/layout/BottomNav.tsx', 'w') as f:
    f.write(content)

# Parent Dashboard
with open('unimonday-web/src/app/parent-dashboard/page.tsx', 'r') as f:
    content = f.read()

content = content.replace('''            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-zinc-900 px-2">Recent Sessions</h2>''', '''            <div className="space-y-4" data-tour="activity-table">
              <h2 className="text-xl font-semibold text-zinc-900 px-2">Recent Sessions</h2>''')
# Add relative z-[210] to the container for correct layering during tour
content = content.replace('<div className="space-y-4" data-tour="activity-table">', '<div className="space-y-4 relative z-[210]" data-tour="activity-table">')

with open('unimonday-web/src/app/parent-dashboard/page.tsx', 'w') as f:
    f.write(content)
