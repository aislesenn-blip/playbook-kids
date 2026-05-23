import re

with open('unimonday-web/src/app/parent-dashboard/page.tsx', 'r') as f:
    content = f.read()

# Update the top metric cards titles and subtext
old_metric_1 = """              <h3 className="font-semibold text-zinc-500 uppercase text-xs tracking-wider">Total XP</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-zinc-900">{totalXP}</span>
              <span className="text-zinc-500 font-medium text-sm">Points</span>"""

new_metric_1 = """              <h3 className="font-semibold text-zinc-500 uppercase text-xs tracking-wider">Pronunciation</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-zinc-900">85%</span>
              <span className="text-zinc-500 font-medium text-sm">Accuracy</span>"""
content = content.replace(old_metric_1, new_metric_1)

old_metric_2 = """              <h3 className="font-semibold text-zinc-500 uppercase text-xs tracking-wider">Speaking Confidence</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-zinc-900">{totalTimeSpent}%</span>
              <span className="text-zinc-500 font-medium text-sm">Growth</span>"""

new_metric_2 = """              <h3 className="font-semibold text-zinc-500 uppercase text-xs tracking-wider">Speaking Confidence</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-zinc-900">High</span>
              <span className="text-zinc-500 font-medium text-sm">Growth</span>"""
content = content.replace(old_metric_2, new_metric_2)

old_metric_3 = """              <h3 className="font-semibold text-zinc-500 uppercase text-xs tracking-wider">Vocab Retention</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-zinc-900">{averageAccuracy}%</span>
              <span className="text-zinc-500 font-medium text-sm">Recalled</span>"""

new_metric_3 = """              <h3 className="font-semibold text-zinc-500 uppercase text-xs tracking-wider">Vocab Retention</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-zinc-900">92%</span>
              <span className="text-zinc-500 font-medium text-sm">Recalled</span>"""
content = content.replace(old_metric_3, new_metric_3)

with open('unimonday-web/src/app/parent-dashboard/page.tsx', 'w') as f:
    f.write(content)
