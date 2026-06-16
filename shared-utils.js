// Shared utilities for EchoMind UI - lightweight dynamic rendering helpers
(function(){
    const EchoMind = {
        setProfile(profile){
            if(!profile) return;
            const map = {
                'user-name': profile.name || '—',
                'user-level': profile.level || '—',
                'carbon-footprint': profile.carbonFootprint || '—',
                'carbon-comparison': profile.carbonComparison || '—',
                'trees-offset': profile.treesOffset || '—',
                'eco-badges': profile.ecoBadges || '—',
                'regional-rank': profile.regionalRank || '—'
            };
            Object.keys(map).forEach(k => {
                const el = document.querySelector('[data-field="'+k+'"]');
                if(el) el.textContent = map[k];
            });
        },
        setDashboard(metrics){
            if(!metrics) return;
            const map = {
                'today-footprint': metrics.todayFootprint || '—',
                'today-comparison': metrics.todayComparison || '—',
                'monthly-goal-percent': metrics.monthlyGoalPercent || '—',
                'eco-score': metrics.ecoScore || '—',
                'carbon-saved': metrics.carbonSaved || '—',
                'weekly-carbon-score': metrics.weeklyCarbonScore || '—',
                'sustainability-level': metrics.sustainabilityLevel || '—',
                'pie-total': metrics.pieTotal || '—',
                'pie-transport': metrics.pieTransport || '—',
                'pie-food': metrics.pieFood || '—',
                'pie-electricity': metrics.pieElectricity || '—',
                'pie-shopping': metrics.pieShopping || '—'
            };
            Object.keys(map).forEach(k => {
                const el = document.querySelector('[data-field="'+k+'"]');
                if(el) el.textContent = map[k];
            });

            // Render a simple carbon-trend bar chart if provided
            const trendContainer = document.querySelector('[data-field="carbon-trend"]');
            if(trendContainer && Array.isArray(metrics.carbonTrend)){
                trendContainer.innerHTML = '';
                const max = Math.max(...metrics.carbonTrend.map(v=>Number(v)||0), 1);
                metrics.carbonTrend.forEach((val, idx) => {
                    const pct = Math.round((Number(val)/max)*100);
                    const col = document.createElement('div');
                    col.className = 'group relative w-full bg-secondary/10 rounded-t-lg transition-all hover:bg-secondary/20 flex-1';
                    col.style.height = pct + '%';
                    col.style.minHeight = '6px';
                    col.style.display = 'flex';
                    col.style.alignItems = 'flex-end';

                    const inner = document.createElement('div');
                    inner.className = 'absolute inset-x-2 bottom-0 h-full bg-secondary rounded-t-lg';
                    inner.style.height = '100%';

                    const tip = document.createElement('div');
                    tip.className = 'opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-2 py-1 rounded pointer-events-none transition-opacity';
                    tip.textContent = val + ' kg';

                    col.appendChild(inner);
                    col.appendChild(tip);
                    trendContainer.appendChild(col);
                });
            }
        },
        setTracker(summary){
            if(!summary) return;
            const map = {
                'today-date': summary.date || '—',
                'impact-level': summary.impact || '—',
                'logged-trips': summary.trips || '—',
                'logged-meals': summary.meals || '—',
                'net-offset': summary.netOffset || '—'
            };
            Object.keys(map).forEach(k => {
                const el = document.querySelector('[data-field="'+k+'"]');
                if(el) el.textContent = map[k];
            });
        },
        highlightActiveNav(){
            try{
                const anchors = document.querySelectorAll('aside a[href]');
                const path = window.location.pathname.split('/').pop();
                anchors.forEach(a => {
                    const href = a.getAttribute('href');
                    if(href && href.indexOf(path) !== -1){
                        a.classList.add('bg-secondary-container','text-on-secondary-container');
                    }
                });
            }catch(e){/*ignore*/}
        }
    };

    window.EchoMind = EchoMind;

    // Demo auto-population if page contains target fields (for initial dev)
    document.addEventListener('DOMContentLoaded', () => {
        EchoMind.highlightActiveNav();

        if(document.querySelector('[data-field="user-name"]')){
            // Mock profile data for development; remove or replace when integrating backend
            EchoMind.setProfile({
                name: 'Alex River',
                level: 'Level 4 Eco-Guardian',
                carbonFootprint: '3.4 t CO₂e / year',
                carbonComparison: '24% below average',
                treesOffset: '124',
                ecoBadges: '82',
                regionalRank: 'Top 5%'
            });
        }

        if(document.querySelector('[data-field="today-footprint"]')){
            EchoMind.setDashboard({
                todayFootprint: '4.2 kg',
                todayComparison: '12% lower',
                monthlyGoalPercent: '78%',
                ecoScore: 'A+',
                carbonSaved: '32 kg CO₂',
                weeklyCarbonScore: '24',
                sustainabilityLevel: 'Earth Guardian',
                pieTotal: '4.2 kg Today',
                pieTransport: '45%',
                pieFood: '25%',
                pieElectricity: '20%',
                pieShopping: '10%',
                carbonTrend: [5.2,7.1,4.2,6.3,4.8]
            });
        }

        if(document.querySelector('[data-field="today-date"]')){
            EchoMind.setTracker({
                date: new Date().toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'}),
                impact: 'Low',
                trips: '2 trips',
                meals: '3 meals',
                netOffset: '-4.2 kg'
            });
        }
    });
})();
