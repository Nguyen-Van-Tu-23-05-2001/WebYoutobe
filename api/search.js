export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const q = req.query.q || '';
  if (!q.trim()) {
    return res.status(200).json([]);
  }

  try {
    const url = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q);
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    const html = await response.text();
    const idx = html.indexOf('var ytInitialData = ');
    if (idx !== -1) {
      const sub = html.substring(idx + 20);
      const endIdx = sub.indexOf(';</script>');
      const data = JSON.parse(sub.substring(0, endIdx));
      const items = data.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents?.[0]?.itemSectionRenderer?.contents || [];
      const results = [];
      for (const item of items) {
        if (item.videoRenderer) {
          const v = item.videoRenderer;
          results.push({
            id: v.videoId,
            title: v.title?.runs?.[0]?.text || '',
            channel: v.ownerText?.runs?.[0]?.text || 'YouTube',
            views: v.viewCountText?.simpleText || '',
            time: v.lengthText?.simpleText || 'Video',
            thumb: `https://i.ytimg.com/vi/${v.videoId}/hqdefault.jpg`
          });
          if (results.length >= 15) break;
        }
      }
      return res.status(200).json(results);
    }
    return res.status(200).json([]);
  } catch (err) {
    return res.status(200).json([]);
  }
}
