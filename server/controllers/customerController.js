import redisClient from '../services/redisClient.js';

export async function createCustomer(req, res) {
  try {
    const { name, email, phone, totalSpend, visits, lastActiveDate } = req.body;

    // Basic validation
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }

    const customerData = {
      name,
      email,
      phone: phone || '',
      totalSpend: totalSpend || 0,
      visits: visits || 0,
      lastActiveDate: lastActiveDate || new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    // Publish to Redis Stream
    await redisClient.xAdd(
      'stream:customers',
      '*',
      {
        data: JSON.stringify(customerData)
      }
    );

    return res.status(200).json({ message: 'Customer data queued successfully.' });
  } catch (err) {
    console.error('Error in createCustomer:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
