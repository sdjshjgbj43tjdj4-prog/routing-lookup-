// This would be your serverless function for Vercel
// Note: This is a template - you would need to adapt it for your specific hosting

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { bankName, city, state } = req.body;

    // Validate input
    if (!bankName) {
      return res.status(400).json({ error: 'Bank name is required' });
    }

    // In a real implementation, you would query your database here
    // For security, never return the entire database, only the specific match
    
    // Example of what your logic might look like:
    // const result = await queryDatabase(bankName, city, state);
    
    // For demo purposes, we'll return a mock result
    const mockResult = {
      routingNumber: '061201673',
      bankName: 'AMERIS BANK',
      address: '24 SECOND AVENUE SE',
      city: 'MOULTRIE',
      state: 'GA'
    };

    // If no results found
    if (!mockResult) {
      return res.status(404).json({ error: 'No matching routing number found' });
    }

    // Return the single result (never return multiple results or the entire database)
    res.status(200).json({
      success: true,
      ...mockResult
    });

  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
