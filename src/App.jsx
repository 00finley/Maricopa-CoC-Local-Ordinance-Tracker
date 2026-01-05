import React, { useState, useMemo } from 'react';

const ordinanceData = [
  {"City":"Apache Junction","Topic":"Camping","OrdinanceNumber":"10-5-7","Ordinance":"It is unlawful for any person to camp in or upon any city sidewalk, street, alley, lane, park, public right-of-way or other place to which the general public has access, or under a bridge way or viaduct, unless otherwise specifically authorized.","Penalty":"Misdemeanor, fine up to $2,500 or imprisonment up to 6 months, or both.","Link":""},
  {"City":"Avondale","Topic":"Camping","OrdinanceNumber":"21-2","Ordinance":"It shall be unlawful to camp on any alley, sidewalk, or any other public property within the city, except in designated shelters and facilities.","Penalty":"Class one misdemeanor. Six months imprisonment and/or fine up to $2,500.","Link":"https://library.municode.com/az/avondale/codes/code_of_ordinances?nodeId=CD_ORD_CH21STSI_ARTIINGE_21-2OBSTSI"},
  {"City":"Buckeye","Topic":"Camping","OrdinanceNumber":"11-1-7","Ordinance":"No person shall picnic, lunch, camp, or stay overnight in a place other than those designated for that purpose.","Penalty":"","Link":"https://library.municode.com/az/buckeye/codes/code_of_ordinances"},
  {"City":"Carefree","Topic":"Camping","OrdinanceNumber":"6-4-3","Ordinance":"No person shall camp in any public park, street or place, except when specifically authorized by a permit.","Penalty":"Civil sanction up to $750.","Link":""},
  {"City":"Carefree","Topic":"Loitering","OrdinanceNumber":"6-4-4","Ordinance":"It shall be unlawful for any persons to congregate or loiter upon any public street, sidewalk, alley or thoroughfare in such manner as to interfere with traffic.","Penalty":"Civil sanction up to $750.","Link":""},
  {"City":"Carefree","Topic":"Marijuana","OrdinanceNumber":"5-7-3","Ordinance":"The use, sale, cultivation, manufacture, production, storage or distribution of marijuana is prohibited on property controlled by the Town.","Penalty":"Class one misdemeanor.","Link":"https://codelibrary.amlegal.com/codes/carefree/latest/carefree_az/0-0-0-3142"},
  {"City":"Cave Creek","Topic":"Camping","OrdinanceNumber":"94.16","Ordinance":"No person shall camp on property owned, leased, or licensed by the town unless specifically posted with signage allowing camping.","Penalty":"Fine up to $2,500, imprisonment up to six months, probation up to three years.","Link":"https://codelibrary.amlegal.com/codes/cavecreek/latest/cavecreek_az/0-0-0-27301"},
  {"City":"Chandler","Topic":"Camping","OrdinanceNumber":"11-19","Ordinance":"It is unlawful to camp on any public property within the City unless expressly designated. Unlawful to camp within 500 feet of any school, childcare facility, shelter, or City park.","Penalty":"Class 1 misdemeanor. Fine up to $2,500, imprisonment up to 6 months.","Link":"https://library.municode.com/az/chandler/codes/code_of_ordinances"},
  {"City":"Chandler","Topic":"Marijuana","OrdinanceNumber":"11-17","Ordinance":"It is unlawful to consume marijuana on property controlled by the City. Recreational marijuana retail establishments are prohibited.","Penalty":"Civil infraction, sanction up to $500.","Link":""},
  {"City":"Chandler","Topic":"Pedestrian","OrdinanceNumber":"12-6","Ordinance":"No pedestrian may stop or remain in the portion of the roadway designed for vehicular use or in a traffic island or median.","Penalty":"First violation is civil traffic offense. Second or subsequent is Class One misdemeanor.","Link":""},
  {"City":"El Mirage","Topic":"Under the Influence","OrdinanceNumber":"92.28","Ordinance":"No person shall be in any city park while under the influence of drugs and/or alcohol if impaired to the slightest degree.","Penalty":"Class 1 misdemeanor.","Link":"https://codelibrary.amlegal.com/codes/elmirage/latest/elmirage_az/0-0-0-2830"},
  {"City":"El Mirage","Topic":"Camping","OrdinanceNumber":"92.29","Ordinance":"It shall be unlawful for any person to use publicly owned property for living accommodation purposes, camping, and/or lodging out-of-doors.","Penalty":"Class 3 misdemeanor.","Link":"https://codelibrary.amlegal.com/codes/elmirage/latest/elmirage_az/0-0-0-9185"},
  {"City":"El Mirage","Topic":"Marijuana","OrdinanceNumber":"97.03","Ordinance":"The consumption, cultivation, extraction, manufacture, processing, sale or distribution of marijuana is prohibited on property controlled by the city.","Penalty":"Class 1 misdemeanor.","Link":"https://codelibrary.amlegal.com/codes/elmirage/latest/elmirage_az/0-0-0-10115"},
  {"City":"Fountain Hills","Topic":"Camping","OrdinanceNumber":"Article 11-3","Ordinance":"It shall be unlawful for any person to use a public right-of-way for lying, sleeping, remaining in a sitting position, or camping.","Penalty":"Civil penalty. First offense: $250-$750.","Link":"https://fountainhills.town.codes/TC/11-3-2"},
  {"City":"Fountain Hills","Topic":"Marijuana","OrdinanceNumber":"11-2","Ordinance":"The consumption, cultivation, extraction, manufacture, processing, sale or distribution of marijuana is prohibited on property controlled by the Town.","Penalty":"Fine up to $2,500 or imprisonment up to six months.","Link":""},
  {"City":"Fountain Hills","Topic":"Pedestrian","OrdinanceNumber":"12-2-13","Ordinance":"It is unlawful for any pedestrian to stop or remain in any roadway or traffic island adjacent to any road with speed limit 35 mph or higher.","Penalty":"","Link":""},
  {"City":"Gila Bend","Topic":"Camping","OrdinanceNumber":"131.17","Ordinance":"It is unlawful to engage in camping on property owned, leased, or controlled by the town that is not specifically designated for camping.","Penalty":"Class 3 misdemeanor.","Link":"https://codelibrary.amlegal.com/codes/gilabend/latest/gilabend_az/0-0-0-4082"},
  {"City":"Gilbert","Topic":"Camping","OrdinanceNumber":"42-292","Ordinance":"It shall be unlawful to use a public street, alley, lane, parkway, or right-of-way for lying, sleeping, or camping.","Penalty":"","Link":""},
  {"City":"Gilbert","Topic":"Marijuana","OrdinanceNumber":"42-296","Ordinance":"The use, sale, cultivation, manufacture, production, storage, or distribution of marijuana is prohibited on property controlled by the town.","Penalty":"Class one misdemeanor.","Link":""},
  {"City":"Glendale","Topic":"Camping","OrdinanceNumber":"25-90","Ordinance":"It shall be unlawful for any person to camp upon any public or private land.","Penalty":"Class 3 Misdemeanor.","Link":""},
  {"City":"Glendale","Topic":"Pedestrian","OrdinanceNumber":"24-161","Ordinance":"No pedestrian shall cross a roadway other than in a crosswalk in any business district.","Penalty":"Warning required first. First violation after warning is civil traffic offense.","Link":""},
  {"City":"Goodyear","Topic":"Camping","OrdinanceNumber":"11-1-40","Ordinance":"No person shall camp on any public property unless expressly designated. No camping within 500 feet of any school, childcare facility, shelter, or park.","Penalty":"Class 1 misdemeanor.","Link":""},
  {"City":"Goodyear","Topic":"Marijuana","OrdinanceNumber":"11-1-38","Ordinance":"It is unlawful to smoke, consume, possess, cultivate, manufacture, process, or sell marijuana on property controlled by the City.","Penalty":"Petty offense. Fine up to $2,500.","Link":""},
  {"City":"Guadalupe","Topic":"Marijuana","OrdinanceNumber":"154.092","Ordinance":"The use, sale, cultivation, manufacture, production, storage, or distribution of marijuana is prohibited on property controlled by the town.","Penalty":"Class 1 Misdemeanor.","Link":""},
  {"City":"Guadalupe","Topic":"Camping","OrdinanceNumber":"97.05","Ordinance":"There shall be no sleeping, camping or overnight stays at any alley, right-of-way, road, municipal park, basin, playground.","Penalty":"Class 1 Misdemeanor.","Link":"https://codelibrary.amlegal.com/codes/guadalupe/latest/guadalupe_az/0-0-0-7097"},
  {"City":"Litchfield Park","Topic":"Camping","OrdinanceNumber":"25-287","Ordinance":"It is unlawful to camp on any public property controlled by the City. No camping within 500 feet of any school, childcare facility, shelter, or park.","Penalty":"Class 1 misdemeanor.","Link":""},
  {"City":"Mesa","Topic":"Camping","OrdinanceNumber":"6-1-23","Ordinance":"It is unlawful for any person on City property to camp, establish or maintain camping facilities.","Penalty":"Class 3 misdemeanor.","Link":""},
  {"City":"Mesa","Topic":"Camping","OrdinanceNumber":"6-10-4","Ordinance":"No person shall camp, establish or maintain camping facilities in a city park or adjacent right-of-way.","Penalty":"Class 3 misdemeanor.","Link":""},
  {"City":"Mesa","Topic":"Pedestrian","OrdinanceNumber":"10-3-19","Ordinance":"It shall be unlawful to enter upon or remain on any median or traveled portion of any street to solicit.","Penalty":"","Link":""},
  {"City":"Mesa","Topic":"Marijuana","OrdinanceNumber":"6-25-3","Ordinance":"It is unlawful to acquire, possess, consume, purchase, sell, cultivate, manufacture marijuana on property controlled by the City.","Penalty":"Petty offense.","Link":""},
  {"City":"Paradise Valley","Topic":"Camping","OrdinanceNumber":"10-15","Ordinance":"It is unlawful to establish or maintain a campsite on any public property. Unlawful to camp within 500 feet of any school or childcare facility.","Penalty":"Class 3 misdemeanor.","Link":""},
  {"City":"Paradise Valley","Topic":"Loitering","OrdinanceNumber":"10-3-1","Ordinance":"It shall be unlawful to loiter or prowl in a place, at a time or in a manner not usual for law abiding individuals.","Penalty":"","Link":""},
  {"City":"Peoria","Topic":"Camping","OrdinanceNumber":"7-67","Ordinance":"It shall be unlawful in a park to camp or stay overnight anywhere except in areas designated for camping.","Penalty":"Civil infraction.","Link":""},
  {"City":"Peoria","Topic":"Camping","OrdinanceNumber":"13-10","Ordinance":"Any campsite established in violation is declared a public nuisance. Police authorized to remove campsites.","Penalty":"Warning required.","Link":""},
  {"City":"Peoria","Topic":"Public Urination","OrdinanceNumber":"13-63","Ordinance":"It is unlawful for any person to urinate or defecate in a public place.","Penalty":"","Link":"https://codelibrary.amlegal.com/codes/peoriaaz/latest/peoria_az/0-0-0-48897"},
  {"City":"Peoria","Topic":"Solicitation","OrdinanceNumber":"13-65","Ordinance":"It shall be unlawful to solicit money in an aggressive manner in a public area.","Penalty":"Class one misdemeanor.","Link":"https://codelibrary.amlegal.com/codes/peoriaaz/latest/peoria_az/0-0-0-52916"},
  {"City":"Phoenix","Topic":"Camping","OrdinanceNumber":"23-30","Ordinance":"It shall be unlawful to camp on any public property controlled by the City. Unlawful to camp within 500 feet of any school, child care facility, shelter, or City park.","Penalty":"Class 3 misdemeanor. First offense fine must not exceed $100.","Link":""},
  {"City":"Phoenix","Topic":"Solicitation","OrdinanceNumber":"23-7","Ordinance":"It shall be unlawful to solicit money in an aggressive manner, within 15 feet of any bank or ATM.","Penalty":"Class 1 misdemeanor.","Link":""},
  {"City":"Phoenix","Topic":"Loitering","OrdinanceNumber":"23-8","Ordinance":"It shall be unlawful to loaf, loiter or congregate upon sidewalks so as to obstruct use to pedestrians.","Penalty":"Director may order person to leave park.","Link":"https://phoenix.municipal.codes/CC/23-7"},
  {"City":"Phoenix","Topic":"Obstruction","OrdinanceNumber":"23-9","Ordinance":"It shall be unlawful to obstruct any public street, alley, sidewalk, park.","Penalty":"","Link":"https://phoenix.municipal.codes/CC/23-8"},
  {"City":"Phoenix","Topic":"Pedestrian","OrdinanceNumber":"36-128","Ordinance":"No pedestrian may stop or remain in the portion of the roadway designed for vehicular use.","Penalty":"Warning required first.","Link":"https://phoenix.municipal.codes/CC/23-9"},
  {"City":"Phoenix","Topic":"Public Urination","OrdinanceNumber":"23-48","Ordinance":"It shall be unlawful to urinate or defecate upon any public sidewalks, crosswalks, public path.","Penalty":"","Link":"https://phoenix.municipal.codes/CC/36-128"},
  {"City":"Queen Creek","Topic":"Camping","OrdinanceNumber":"9-5-8","Ordinance":"Any campsite established in violation is declared a public nuisance. Police authorized to remove campsites.","Penalty":"Class 3 misdemeanor.","Link":""},
  {"City":"Queen Creek","Topic":"Public Urination","OrdinanceNumber":"9-5-1","Ordinance":"It shall be unlawful to urinate or defecate in a place open to the public.","Penalty":"Class 3 Misdemeanor.","Link":""},
  {"City":"Queen Creek","Topic":"Pedestrian","OrdinanceNumber":"9-10-2","Ordinance":"It is unlawful for any pedestrian to stop or remain in any roadway or traffic island.","Penalty":"Civil Offense","Link":""},
  {"City":"Scottsdale","Topic":"Camping","OrdinanceNumber":"19-21","Ordinance":"No person shall camp in any public park, the McDowell Sonoran Preserve, public street or public place.","Penalty":"Class 3 misdemeanor.","Link":""},
  {"City":"Scottsdale","Topic":"Public Urination","OrdinanceNumber":"19-19","Ordinance":"It shall be unlawful to urinate or defecate in a place exposed to public view.","Penalty":"Class one misdemeanor with mandatory minimum fine of $150.","Link":""},
  {"City":"Scottsdale","Topic":"Marijuana","OrdinanceNumber":"25-3","Ordinance":"The use, sale, cultivation, manufacture, production, storage, or distribution of marijuana is prohibited on property controlled by the City.","Penalty":"Class one misdemeanor.","Link":""},
  {"City":"Surprise","Topic":"Camping","OrdinanceNumber":"42-50","Ordinance":"It is unlawful to camp, occupy, establish, maintain camp facilities on any public property or private property.","Penalty":"Class 1 misdemeanor.","Link":""},
  {"City":"Surprise","Topic":"Marijuana","OrdinanceNumber":"34-303","Ordinance":"It is unlawful to smoke, consume, sell, distribute, store, cultivate, manufacture marijuana on property controlled by the city.","Penalty":"Class 1 misdemeanor.","Link":""},
  {"City":"Tempe","Topic":"Camping","OrdinanceNumber":"23-91","Ordinance":"No person shall camp on any public property unless specifically authorized or possesses a permit.","Penalty":"Class 1 misdemeanor.","Link":"https://library.municode.com/az/tempe/codes/city_code?nodeId=CH23PARE_ARTIVURCA"},
  {"City":"Tempe","Topic":"Public Urination","OrdinanceNumber":"22-13","Ordinance":"It shall be unlawful to urinate or defecate upon any public or private property.","Penalty":"Petty offense, maximum $300.","Link":""},
  {"City":"Tempe","Topic":"Pedestrian","OrdinanceNumber":"29-70","Ordinance":"No person shall sit or lie down upon a public sidewalk or median in the downtown Central Commercial District.","Penalty":"Warning required.","Link":""},
  {"City":"Tempe","Topic":"Marijuana","OrdinanceNumber":"22A-2","Ordinance":"It is unlawful to smoke, consume, sell, distribute, store, cultivate, manufacture marijuana on property controlled by the City.","Penalty":"Class 1 misdemeanor.","Link":""},
  {"City":"Tolleson","Topic":"Camping","OrdinanceNumber":"2021-07","Ordinance":"It shall be unlawful to camp on any public property controlled by the city.","Penalty":"Class 1 misdemeanor.","Link":""},
  {"City":"Tolleson","Topic":"Marijuana","OrdinanceNumber":"7-5-3","Ordinance":"The consumption, cultivation, extraction, manufacture, processing, sale or distribution of marijuana is prohibited.","Penalty":"Class one misdemeanor.","Link":""},
  {"City":"Tolleson","Topic":"Public Urination","OrdinanceNumber":"7-1-19","Ordinance":"It shall be unlawful to urinate or stool in any place open to public view.","Penalty":"","Link":""},
  {"City":"Wickenburg","Topic":"Camping","OrdinanceNumber":"10-1-25","Ordinance":"It is unlawful to camp on any public property or private property without permission.","Penalty":"First conviction is petty offense. Habitual offender is class one misdemeanor.","Link":""},
  {"City":"Youngtown","Topic":"Camping","OrdinanceNumber":"12.10.030","Ordinance":"No person shall camp in any public park, public place, or upon any public street.","Penalty":"Class 3 misdemeanor.","Link":""},
  {"City":"Youngtown","Topic":"Public Urination","OrdinanceNumber":"9.04.020","Ordinance":"It is unlawful to urinate or defecate in a public place.","Penalty":"","Link":""},
  {"City":"Youngtown","Topic":"Marijuana","OrdinanceNumber":"17.40.120","Ordinance":"The use, sale, cultivation, manufacture, production or distribution of recreational marijuana is prohibited.","Penalty":"Class one misdemeanor.","Link":""}
];

const jurisdictionLandArea = {
  'Apache Junction': 35.1, 'Avondale': 41.3, 'Buckeye': 639.0, 'Carefree': 8.8, 'Cave Creek': 29.0,
  'Chandler': 65.0, 'El Mirage': 10.1, 'Fountain Hills': 18.0, 'Gila Bend': 2.5, 'Gilbert': 69.0,
  'Glendale': 61.0, 'Goodyear': 191.0, 'Guadalupe': 0.5, 'Litchfield Park': 3.4, 'Maricopa County': 6700.0,
  'Mesa': 138.0, 'Paradise Valley': 16.0, 'Peoria': 179.0, 'Phoenix': 518.0, 'Queen Creek': 28.0,
  'Scottsdale': 184.0, 'Surprise': 109.0, 'Tempe': 40.0, 'Tolleson': 6.0, 'Wickenburg': 11.0, 'Youngtown': 1.0
};

const TOTAL_COUNTY_AREA = 9224;
const TOTAL_JURISDICTIONS = 26;

const topicColors = {
  'Camping': { bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-800', hex: '#f59e0b' },
  'Loitering': { bg: 'bg-slate-50', border: 'border-slate-200', badge: 'bg-slate-100 text-slate-800', hex: '#64748b' },
  'Marijuana': { bg: 'bg-emerald-50', border: 'border-emerald-200', badge: 'bg-emerald-100 text-emerald-800', hex: '#10b981' },
  'Pedestrian': { bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-800', hex: '#3b82f6' },
  'Under the Influence': { bg: 'bg-purple-50', border: 'border-purple-200', badge: 'bg-purple-100 text-purple-800', hex: '#8b5cf6' },
  'Public Urination': { bg: 'bg-rose-50', border: 'border-rose-200', badge: 'bg-rose-100 text-rose-800', hex: '#f43f5e' },
  'Solicitation': { bg: 'bg-orange-50', border: 'border-orange-200', badge: 'bg-orange-100 text-orange-800', hex: '#f97316' },
  'Obstruction': { bg: 'bg-cyan-50', border: 'border-cyan-200', badge: 'bg-cyan-100 text-cyan-800', hex: '#06b6d4' }
};

const defaultColors = { bg: 'bg-gray-50', border: 'border-gray-200', badge: 'bg-gray-100 text-gray-800', hex: '#6b7280' };

const allJurisdictions = [
  'Apache Junction', 'Avondale', 'Buckeye', 'Carefree', 'Cave Creek', 'Chandler',
  'El Mirage', 'Fountain Hills', 'Gila Bend', 'Gilbert', 'Glendale', 'Goodyear',
  'Guadalupe', 'Litchfield Park', 'Maricopa County', 'Mesa', 'Paradise Valley', 'Peoria', 'Phoenix',
  'Queen Creek', 'Scottsdale', 'Surprise', 'Tempe', 'Tolleson', 'Wickenburg', 'Youngtown'
];

export default function App() {
  const [selectedOrdinance, setSelectedOrdinance] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [jurisdictionFilter, setJurisdictionFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const [viewMode, setViewMode] = useState('categories');

  const categories = useMemo(() => [...new Set(ordinanceData.map(d => d.Topic))].sort(), []);

  const filteredData = useMemo(() => {
    return ordinanceData.filter(item => {
      const matchesCategory = !categoryFilter || item.Topic === categoryFilter;
      const matchesJurisdiction = !jurisdictionFilter || item.City === jurisdictionFilter;
      const matchesSearch = !searchTerm || 
        item.City.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.Topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.Ordinance.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesJurisdiction && matchesSearch;
    });
  }, [categoryFilter, jurisdictionFilter, searchTerm]);

  const groupedByCategory = useMemo(() => {
    const grouped = {};
    filteredData.forEach(item => {
      if (!grouped[item.Topic]) grouped[item.Topic] = { citiesMap: {}, uniqueCities: new Set() };
      grouped[item.Topic].uniqueCities.add(item.City);
      if (!grouped[item.Topic].citiesMap[item.City]) grouped[item.Topic].citiesMap[item.City] = [];
      grouped[item.Topic].citiesMap[item.City].push(item);
    });
    return grouped;
  }, [filteredData]);

  const matrixData = useMemo(() => {
    const matrix = {};
    allJurisdictions.forEach(city => {
      matrix[city] = {};
      categories.forEach(cat => {
        matrix[city][cat] = ordinanceData.filter(d => d.City === city && d.Topic === cat);
      });
    });
    return matrix;
  }, [categories]);

  const statistics = useMemo(() => {
    const stats = {};
    categories.forEach(cat => {
      const citiesWithOrdinance = new Set(ordinanceData.filter(d => d.Topic === cat).map(d => d.City));
      const landArea = Array.from(citiesWithOrdinance).reduce((sum, city) => sum + (jurisdictionLandArea[city] || 0), 0);
      stats[cat] = {
        count: citiesWithOrdinance.size,
        cities: citiesWithOrdinance,
        landArea,
        landCoverage: ((landArea / TOTAL_COUNTY_AREA) * 100).toFixed(1)
      };
    });
    return stats;
  }, [categories]);

  const clearFilters = () => { setCategoryFilter(''); setJurisdictionFilter(''); setSearchTerm(''); };

  const handleCityClick = (city, topic = null) => {
    const cityOrdinances = topic 
      ? ordinanceData.filter(d => d.City === city && d.Topic === topic)
      : ordinanceData.filter(d => d.City === city);
    if (cityOrdinances.length > 0) {
      setSelectedOrdinance({ city, topic: topic || 'All Ordinances', ordinances: cityOrdinances });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Local Policy Landscape Review</h1>
              <p className="text-slate-500 text-sm mt-0.5">Urban Camping Prohibitions & Related Ordinances</p>
            </div>
            <button onClick={() => setShowInfo(!showInfo)} className="self-start sm:self-auto inline-flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {showInfo ? 'Hide Info' : 'About This Dashboard'}
            </button>
          </div>
        </div>
      </header>

      {/* Info Panel */}
      {showInfo && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Purpose</h3>
                <p className="text-slate-700 text-sm leading-relaxed mb-3">
                  This dashboard provides a comprehensive overview of local ordinances across Maricopa County that may impact individuals experiencing homelessness. It is designed to support regional coordination, policy analysis, and informed decision-making by CoC stakeholders, service providers, and policymakers.
                </p>
                <p className="text-slate-700 text-sm leading-relaxed">
                  The data includes ordinances from 25 incorporated cities and towns in Maricopa County, plus Maricopa County (unincorporated areas). Categories cover camping prohibitions, loitering, marijuana use on public property, pedestrian restrictions, public intoxication, public urination, solicitation, and obstruction of public ways.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">How to Use</h3>
                <ul className="text-slate-700 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Category View:</strong> Browse ordinances grouped by type. Click any jurisdiction button to view full ordinance text and penalties.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Matrix View:</strong> Compare all jurisdictions across all ordinance types at a glance. Checkmarks indicate presence of an ordinance.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Filters:</strong> Use the search bar and dropdown filters to find specific jurisdictions, categories, or keywords.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong>Statistics:</strong> The summary bar shows jurisdiction counts and land area coverage for each category.</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-blue-200">
              <p className="text-xs text-slate-500">
                <strong>Data Source:</strong> Maricopa Association of Governments, Community Initiatives Division, 2025. Ordinance text excerpted from municipal codes; verify current language with official sources before citation. 
                <strong className="ml-2">Contact:</strong> MAG Continuum of Care Program
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Statistics Panel */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map(cat => (
              <div key={cat} className={`p-3 rounded-lg ${(topicColors[cat] || defaultColors).bg} border ${(topicColors[cat] || defaultColors).border}`}>
                <div className="text-xs font-medium text-slate-600 truncate">{cat}</div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-lg font-bold text-slate-800">{statistics[cat]?.count || 0}</span>
                  <span className="text-xs text-slate-500">/ {TOTAL_JURISDICTIONS}</span>
                </div>
                <div className="text-xs text-slate-500 mt-0.5">{statistics[cat]?.landCoverage || 0}% land</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* View Toggle & Filters */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="flex bg-slate-100 rounded-lg p-1">
              <button onClick={() => setViewMode('categories')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${viewMode === 'categories' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-800'}`}>
                Category View
              </button>
              <button onClick={() => setViewMode('matrix')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${viewMode === 'matrix' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-800'}`}>
                Matrix View
              </button>
            </div>
            <div className="flex flex-wrap gap-2 flex-1 justify-end">
              <input type="text" placeholder="Search ordinances..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-48" />
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white">
                <option value="">All Categories</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <select value={jurisdictionFilter} onChange={(e) => setJurisdictionFilter(e.target.value)} className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white">
                <option value="">All Jurisdictions</option>
                {allJurisdictions.map(j => <option key={j} value={j}>{j}</option>)}
              </select>
              {(categoryFilter || jurisdictionFilter || searchTerm) && (
                <button onClick={clearFilters} className="px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Clear</button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        
        {/* Category View */}
        {viewMode === 'categories' && (
          <div className="space-y-6">
            {Object.entries(groupedByCategory).sort(([a], [b]) => a.localeCompare(b)).map(([category, { citiesMap, uniqueCities }]) => {
              const colors = topicColors[category] || defaultColors;
              return (
                <div key={category} className={`rounded-xl border ${colors.border} ${colors.bg} overflow-hidden`}>
                  <div className="px-4 py-3 border-b border-slate-200/50 flex flex-wrap items-center gap-3">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${colors.badge}`}>{category}</span>
                    <span className="text-sm text-slate-600 font-medium">{uniqueCities.size} of {TOTAL_JURISDICTIONS} jurisdictions</span>
                    <span className="text-sm text-slate-500">({statistics[category]?.landCoverage}% land coverage)</span>
                  </div>
                  <div className="p-4 flex flex-wrap gap-2">
                    {Object.keys(citiesMap).sort().map(city => {
                      const cityOrdinances = citiesMap[city];
                      return (
                        <button key={city} onClick={() => setSelectedOrdinance({ city, topic: category, ordinances: cityOrdinances })}
                          className="px-3 py-1.5 text-sm font-medium rounded-lg hover:shadow-sm transition-all text-slate-700 bg-white border border-slate-200 hover:bg-slate-50">
                          {city}{cityOrdinances.length > 1 && <span className="ml-1.5 text-xs text-slate-400">({cityOrdinances.length})</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            {Object.keys(groupedByCategory).length === 0 && (
              <div className="text-center py-12 text-slate-500">
                <p>No ordinances match your current filters.</p>
                <button onClick={clearFilters} className="mt-2 text-blue-600 hover:underline">Clear filters</button>
              </div>
            )}
          </div>
        )}

        {/* Matrix View */}
        {viewMode === 'matrix' && (
          <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="sticky left-0 bg-slate-50 px-4 py-3 text-left font-semibold text-slate-700 border-b border-r border-slate-200 min-w-[160px]">Jurisdiction</th>
                  {categories.map(cat => (
                    <th key={cat} className="px-2 py-3 text-center font-semibold border-b border-slate-200 min-w-[90px]">
                      <div className="flex justify-center">
                        <span className={`px-2 py-0.5 text-xs rounded-full whitespace-nowrap ${(topicColors[cat] || defaultColors).badge}`}>
                          {cat.length > 12 ? cat.slice(0, 10) + '…' : cat}
                        </span>
                      </div>
                    </th>
                  ))}
                  <th className="px-3 py-3 text-center font-semibold border-b border-l border-slate-200">Total</th>
                </tr>
              </thead>
              <tbody>
                {allJurisdictions.map((city, idx) => {
                  const cityTotal = categories.reduce((sum, cat) => sum + (matrixData[city][cat]?.length > 0 ? 1 : 0), 0);
                  const isCounty = city === 'Maricopa County';
                  return (
                    <tr key={city} className={`${isCounty ? 'bg-slate-100' : idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                      <td className={`sticky left-0 ${isCounty ? 'bg-slate-100' : idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'} px-4 py-2 font-medium text-slate-800 border-r border-slate-200`}>
                        {city}
                        {isCounty && <span className="ml-1 text-xs text-slate-500">(Unincorporated)</span>}
                      </td>
                      {categories.map(cat => {
                        const count = matrixData[city][cat]?.length || 0;
                        return (
                          <td key={cat} className="px-2 py-2">
                            <div className="flex justify-center items-center">
                              {count > 0 ? (
                                <button onClick={() => handleCityClick(city, cat)}
                                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold hover:scale-110 transition-transform ${(topicColors[cat] || defaultColors).badge}`}>
                                  {count > 1 ? count : '✓'}
                                </button>
                              ) : <span className="text-slate-300">—</span>}
                            </div>
                          </td>
                        );
                      })}
                      <td className="px-3 py-2 text-center font-semibold text-slate-700 border-l border-slate-200">{cityTotal}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-slate-100 font-semibold">
                  <td className="sticky left-0 bg-slate-100 px-4 py-3 border-t border-r border-slate-200">Total Jurisdictions</td>
                  {categories.map(cat => (
                    <td key={cat} className="px-2 py-3 border-t border-slate-200">
                      <div className="flex justify-center">{statistics[cat]?.count || 0}</div>
                    </td>
                  ))}
                  <td className="px-3 py-3 text-center border-t border-l border-slate-200">—</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </main>

      {/* Modal */}
      {selectedOrdinance && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedOrdinance(null)} />
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-slate-200 flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">{selectedOrdinance.city}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full ${(topicColors[selectedOrdinance.topic] || defaultColors).badge}`}>
                      {selectedOrdinance.topic}
                    </span>
                    {selectedOrdinance.ordinances.length > 1 && <span className="text-xs text-slate-500">{selectedOrdinance.ordinances.length} ordinances</span>}
                  </div>
                </div>
                <button onClick={() => setSelectedOrdinance(null)} className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {selectedOrdinance.ordinances.map((ord, idx) => (
                  <div key={idx} className={idx > 0 ? 'mt-6 pt-6 border-t border-slate-200' : ''}>
                    {selectedOrdinance.ordinances.length > 1 && (
                      <div className="mb-3 flex items-center gap-2">
                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${(topicColors[ord.Topic] || defaultColors).badge}`}>{ord.Topic}</span>
                        <span className="text-xs text-slate-400">Ordinance {idx + 1} of {selectedOrdinance.ordinances.length}</span>
                      </div>
                    )}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Ordinance Number</h3>
                        <p className="text-slate-800 font-mono text-sm">{ord.OrdinanceNumber}</p>
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Ordinance Text</h3>
                        <p className="text-slate-700 text-sm leading-relaxed">{ord.Ordinance}</p>
                      </div>
                      {ord.Penalty && (
                        <div>
                          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Penalty</h3>
                          <p className="text-slate-700 text-sm leading-relaxed">{ord.Penalty}</p>
                        </div>
                      )}
                      {ord.Link && ord.Link.startsWith('http') && (
                        <div>
                          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Source</h3>
                          <a href={ord.Link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:underline">
                            View Full Ordinance <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-3 border-t border-slate-200 bg-slate-50">
                <button onClick={() => setSelectedOrdinance(null)} className="w-full px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-8">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-slate-500">Maricopa Association of Governments · Community Initiatives Division · Continuum of Care</p>
        </div>
      </footer>
    </div>
  );
}
