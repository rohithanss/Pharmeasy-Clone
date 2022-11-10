function container() {
  return `  <div id="container">
  <div class="container-heading">
  <h3>Orders</h3>
    <h3>Drafts</h3>
  </div>
  <div class="container-nav">
    <div>
      <select name="filter-by-status" id="filter-by-status">
        <option value="">Filter by Status</option>
        <option value="placed">Placed</option>
        <option value="shipped">Shipped</option>
        <option value="returned">Returned</option>
        <option value="delivered">Delivered</option>
      </select>
      <select name="sort-by-date" id="sort-by-date">
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>
    <div class="container-searchBar">
      <i class="fa-solid fa-magnifying-glass"></i>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search anything..."
      />
    </div>
  </div>
  <table>
    <thead>
      <tr>
        <th>Order Id</th>
        <th>Customer</th>
        <th>Mobile</th>
        <th>Status</th>
        <th>Bill Amount</th>
        <th>View Detail</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>

  <div class="container-pagination">
    <div>1 - 10 of 20 orders</div>
    <div>
      <span>1 of 2</span
      ><span>
        <i class="fa-solid fa-arrow-left"> </i>
        <i class="fa-solid fa-arrow-right"> </i>
      </span>
    </div>
  </div>
</div>`;
}
export { container };
