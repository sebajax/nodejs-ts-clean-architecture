class PaginationUtil {
  public static limit = 10;

  public static getPagination(page: number): number {
    if (page !== null) {
      return page <= 0 ? 0 : (page - 1) * this.limit;
    }
    return 0;
  }

  public static getPaginationData(
    count: number,
    page: number
  ): {total: number; current: number} {
    return {
      current: page <= 0 ? 1 : page,
      total: Math.ceil(count / this.limit),
    };
  }
}

export default PaginationUtil;
