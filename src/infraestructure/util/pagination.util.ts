export default class PaginationUtil {
  static limit = 10;

  static getPagination(page: number): number {
    if (page !== null) {
      return page <= 0 ? 0 : (page - 1) * this.limit;
    }
    return 0;
  }

  static getPaginationData(
    count: number,
    page: number
  ): { total: number; current: number } {
    return {
      total: Math.ceil(count / this.limit),
      current: page <= 0 ? 1 : page,
    };
  }
}
