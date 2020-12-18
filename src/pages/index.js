import * as React from "react";
import { graphql, Link } from "gatsby";

function Index({ data }) {
  return (
    <div className="wrapper">
      <main>
        <h1>Route API, Markdown, dan Yaml</h1>
        <h3>
          <span role="img" aria-label="tips">
            💡
          </span>{" "}
          <em style={{ color: "orangered" }}>TIPS</em>: Restart server kalau
          tidak ada perubahan saat edit Markdown / YAML
        </h3>
        <p>
          Silahkan lihat{` `}
          <a href="https://www.gatsbyjs.com/docs/file-system-route-api">
            dokumentasi
          </a>
          {` `}untuk Gatbsy Route API yang terbaru, di bawah ini contoh-contoh
          menggunakan Route API dengan Markdown dan YAML.
        </p>
        <h2>Contoh Routes dengan YAML</h2>
        <p>
          Daftar products yang dibuat dengan{" "}
          <em style={{ color: "orange" }}>YAML</em> dihubungkan dengan name &
          SKU. yang dibuat dengan beberapa
          {` `}
          <em>dinamis</em> routes. Ketika halaman yang dikunjungi tidak ada akan
          di fallback dengan halaman{` `}
          <em style={{ color: "yellow" }}>[name].js</em>. Contoh ini bisa
          digunakan untuk multiple-halaman dengan merujuk ke name and SKU.
          Contents halaman ada di{" "}
          <em style={{ color: "yellow" }}>products/product.yaml</em>
        </p>
        <p>
          In order to link to create the correct links in this overview{` `}
          <em>gatsbyPath</em> was used.
        </p>
        <ul>
          {data.products.nodes.map((product) => (
            <li key={product.meta.sku}>
              <Link to={product.nameSlug}>{product.name}</Link>
              {` `}
              <Link to={product.skuSlug}>(SKU)</Link>
            </li>
          ))}
          <li>
            <Link to={`/products/self-parking-attack-motorcycle`}>
              Module PLC
            </Link>
            {` `}
            (Halaman ini tidak ada)
          </li>
        </ul>
        <h2>Contoh Routes dengan Markdown</h2>
        <p>
          The example below is a list of blog posts that were written in
          markdown and named in the format <em>YYYY-MM-DD-title.md</em>.
          Markdown nodes automatically add the <em>File</em> node as a parent
          thus you can access things like the <em>name</em>, e.g. to construct a
          route at <em>/blog/YYYY-MM-DD-title</em>.
        </p>
        <ul>
          {data.blog.nodes.map((post) => (
            <li key={post.parent.name}>
              <Link to={`/blog/${post.parent.name}`}>
                {post.frontmatter.title}
              </Link>
            </li>
          ))}
        </ul>
        <h3>Nested collections</h3>
        <p>
          The example below does a <em>group</em> query on all parks and links
          to them. The paths are created as nested collections, e.g. to
          construct a route at <em>/parks/theme-park/park-one/</em>.
        </p>
        <div>
          {data.parks.group.map((field) => {
            const groupName = field.fieldValue;
            const inValidLinkPrefix =
              groupName === `Resort` ? `/parks/resort/` : `/parks/theme-park/`;

            return (
              <React.Fragment>
                <h4>{groupName}</h4>
                <ul>
                  <li>
                    <Link to={`${inValidLinkPrefix}hogwarts`}>
                      Non-existing {groupName}
                    </Link>
                  </li>
                  {field.nodes.map((park) => (
                    <li key={park.gatsbyPath}>
                      <Link to={park.gatsbyPath}>{park.name}</Link>
                    </li>
                  ))}
                </ul>
              </React.Fragment>
            );
          })}
        </div>
        <h2>Client-Only routes</h2>
        <p>
          As shortly mentioned for the "Collection routes" the{` `}
          <em>[name].js</em> file inside <em>src/pages/products</em> is alreay a
          client-only page. But you can do even more with those! See the example
          below:
        </p>
        <ul>
          <li>
            <Link to="/products/incite/offer/REHOBOAM">
              /products/[brand]/offer/[coupon]
            </Link>
          </li>
          <li>
            <Link to="/image/www.gatsbyjs.com/Gatsby-Logo.svg">
              /image/[...imageUrl]
            </Link>
          </li>
        </ul>
      </main>
    </div>
  );
}

export default Index;

export const query = graphql`
  {
    products: allProduct {
      nodes {
        name
        nameSlug: gatsbyPath(filePath: "/products/{Product.name}")
        skuSlug: gatsbyPath(filePath: "/products/{Product.meta__sku}")
        meta {
          sku
        }
      }
    }
    blog: allMarkdownRemark {
      nodes {
        frontmatter {
          title
        }
        parent {
          ... on File {
            name
          }
        }
      }
    }
    parks: allPark {
      group(field: meta___location___type) {
        fieldValue
        nodes {
          name
          gatsbyPath(filePath: "/parks/{park.meta__location__type}/{park.name}")
        }
      }
    }
  }
`;