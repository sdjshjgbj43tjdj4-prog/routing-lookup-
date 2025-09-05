import routingData from '../../routing.json' assert { type: 'json' };

// Get unique values
function unique(arr) { return [...new Set(arr)]; }

export default function handler(req, res) {
  const { state, city_ascii, bank, action } = req.query;

  // 1️⃣ Return all states
  if (action === 'states') {
    const states = unique(routingData.map(r => r.state));
    res.status(200).json(states);
    return;
  }

  // 2️⃣ Return cities for selected state
  if (action === 'cities' && state) {
    const cities = unique(routingData.filter(r => r.state === state).map(r => r.city_ascii));
    res.status(200).json(cities);
    return;
  }

  // 3️⃣ Lookup routing number and return full details
  if (state && city_ascii && bank) {
    const record = routingData.find(r =>
      r.state === state &&
      r.city_ascii === city_ascii &&
      r.bank.toLowerCase() === bank.toLowerCase()
    );
    if (record) {
      res.status(200).json({
        bank: record.bank,
        routing: record.routing,
        address: record.address,
        city_ascii: record.city_ascii,
        state: record.state,
        zip: record.zip
      });
    } else {
      res.status(404).json({ error: 'Routing number not found' });
    }
    return;
  }

  res.status(400).json({ error: 'Invalid request' });
}
