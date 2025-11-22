export async function getChats(req, res, next) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const client = getClient();
    const chats = await client.listChats();

    const start = (page - 1) * limit;
    const end = page * limit;

    res.json({
      success: true,
      page,
      total: chats.length,
      chats: chats.slice(start, end),
    });
  } catch (error) {
    next(error);
  }
}
