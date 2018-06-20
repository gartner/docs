webpackJsonp([92871184208699],{387:function(n,a){n.exports={data:{post:{html:'<h1 id="handling-relations-to-collections"><a href="#handling-relations-to-collections" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Handling Relations to Collections</h1>\n<p>Currently, API Platform Admin doesn\'t handle <code>to-many</code> relations. The core library <a href="https://github.com/api-platform/core/pull/1189" target="_blank" rel="nofollow noopener noreferrer">is being patched</a>\nto document relations to collections through OWL.</p>\n<p>Meanwhile, it is possible to manually configure API Platform to handle relations to collections.</p>\n<p>We will create the admin for an API exposing <code>Person</code> and <code>Book</code> resources linked with a <code>many-to-many</code>\nrelation between them (through the <code>authors</code> property).</p>\n<p>This API can be created using the following PHP code:</p>\n<div class="gatsby-highlight">\n      <pre class="language-php"><code><span class="token delimiter important">&lt;?php</span>\n<span class="token comment">// api/src/Entity/Person.php</span>\n\n<span class="token keyword">namespace</span> <span class="token package">App<span class="token punctuation">\\</span>Entity</span><span class="token punctuation">;</span>\n\n<span class="token keyword">use</span> <span class="token package">ApiPlatform<span class="token punctuation">\\</span>Core<span class="token punctuation">\\</span>Annotation<span class="token punctuation">\\</span>ApiResource</span><span class="token punctuation">;</span>\n<span class="token keyword">use</span> <span class="token package">Doctrine<span class="token punctuation">\\</span>ORM<span class="token punctuation">\\</span>Mapping</span> <span class="token keyword">as</span> <span class="token constant">ORM</span><span class="token punctuation">;</span>\n\n<span class="token comment">/**\n * @ApiResource\n * @ORM\\Entity\n */</span>\n<span class="token keyword">class</span> <span class="token class-name">Person</span>\n<span class="token punctuation">{</span>\n    <span class="token comment">/**\n     * @ORM\\Column(type="integer")\n     * @ORM\\GeneratedValue\n     * @ORM\\Id\n     */</span>\n    <span class="token keyword">public</span> <span class="token variable">$id</span><span class="token punctuation">;</span>\n\n    <span class="token comment">/**\n     * @ORM\\Column\n     */</span>\n    <span class="token keyword">public</span> <span class="token variable">$name</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-php"><code><span class="token delimiter important">&lt;?php</span>\n<span class="token comment">// api/src/Entity/Book.php</span>\n\n<span class="token keyword">namespace</span> <span class="token package">App<span class="token punctuation">\\</span>Entity</span><span class="token punctuation">;</span>\n\n<span class="token keyword">use</span> <span class="token package">ApiPlatform<span class="token punctuation">\\</span>Core<span class="token punctuation">\\</span>Annotation<span class="token punctuation">\\</span>ApiResource</span><span class="token punctuation">;</span>\n<span class="token keyword">use</span> <span class="token package">Doctrine<span class="token punctuation">\\</span>Common<span class="token punctuation">\\</span>Collections<span class="token punctuation">\\</span>ArrayCollection</span><span class="token punctuation">;</span>\n<span class="token keyword">use</span> <span class="token package">Doctrine<span class="token punctuation">\\</span>ORM<span class="token punctuation">\\</span>Mapping</span> <span class="token keyword">as</span> <span class="token constant">ORM</span><span class="token punctuation">;</span>\n\n<span class="token comment">/**\n * @ApiResource\n * @ORM\\Entity\n */</span>\n<span class="token keyword">class</span> <span class="token class-name">Book</span>\n<span class="token punctuation">{</span>\n    <span class="token comment">/**\n     * @ORM\\Column(type="integer")\n     * @ORM\\GeneratedValue\n     * @ORM\\Id\n     */</span>\n    <span class="token keyword">public</span> <span class="token variable">$id</span><span class="token punctuation">;</span>\n\n    <span class="token comment">/**\n     * @ORM\\ManyToMany(targetEntity="Person")\n     */</span>\n    <span class="token keyword">public</span> <span class="token variable">$authors</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">public</span> <span class="token keyword">function</span> <span class="token function">__construct</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        <span class="token variable">$this</span><span class="token operator">-</span><span class="token operator">></span><span class="token property">authors</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayCollection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Let\'s customize the components used for the <code>authors</code> property:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'react\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> ReferenceArrayField<span class="token punctuation">,</span> SingleFieldList<span class="token punctuation">,</span> ChipField<span class="token punctuation">,</span> ReferenceArrayInput<span class="token punctuation">,</span> SelectArrayInput <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'react-admin\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> AdminBuilder<span class="token punctuation">,</span> hydraClient <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'@api-platform/admin\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> parseHydraDocumentation <span class="token keyword">from</span> <span class="token string">\'api-doc-parser/lib/hydra/parseHydraDocumentation\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> entrypoint <span class="token operator">=</span> <span class="token string">\'https://demo.api-platform.com\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">extends</span> Component <span class="token punctuation">{</span>\n  state <span class="token operator">=</span> <span class="token punctuation">{</span>api<span class="token punctuation">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> resources<span class="token punctuation">:</span> <span class="token keyword">null</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n  <span class="token function">componentDidMount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">parseHydraDocumentation</span><span class="token punctuation">(</span>entrypoint<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">{</span>api<span class="token punctuation">,</span> resources<span class="token punctuation">}</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n        <span class="token keyword">const</span> books <span class="token operator">=</span> r<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>r <span class="token operator">=></span> <span class="token string">\'books\'</span> <span class="token operator">===</span> r<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token comment">// Set the field in the list and the show views</span>\n        books<span class="token punctuation">.</span>readableFields<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>f <span class="token operator">=></span> <span class="token string">\'authors\'</span> <span class="token operator">===</span> f<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">.</span>fieldComponent <span class="token operator">=</span>\n          <span class="token operator">&lt;</span>ReferenceArrayField label<span class="token operator">=</span><span class="token string">"Authors"</span> reference<span class="token operator">=</span><span class="token string">"people"</span> source<span class="token operator">=</span><span class="token string">"authors"</span> key<span class="token operator">=</span><span class="token string">"authors"</span><span class="token operator">></span>\n            <span class="token operator">&lt;</span>SingleFieldList<span class="token operator">></span>\n              <span class="token operator">&lt;</span>ChipField source<span class="token operator">=</span><span class="token string">"name"</span> key<span class="token operator">=</span><span class="token string">"name"</span><span class="token operator">/</span><span class="token operator">></span>\n            <span class="token operator">&lt;</span><span class="token operator">/</span>SingleFieldList<span class="token operator">></span>\n          <span class="token operator">&lt;</span><span class="token operator">/</span>ReferenceArrayField<span class="token operator">></span>\n        <span class="token punctuation">;</span>\n\n        <span class="token comment">// Set the input in the edit and create views</span>\n        books<span class="token punctuation">.</span>writableFields<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>f <span class="token operator">=></span> <span class="token string">\'authors\'</span> <span class="token operator">===</span> f<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">.</span>inputComponent <span class="token operator">=</span>\n          <span class="token operator">&lt;</span>ReferenceArrayInput label<span class="token operator">=</span><span class="token string">"Authors"</span> reference<span class="token operator">=</span><span class="token string">"people"</span> source<span class="token operator">=</span><span class="token string">"authors"</span> key<span class="token operator">=</span><span class="token string">"authors"</span><span class="token operator">></span>\n            <span class="token operator">&lt;</span>SelectArrayInput optionText<span class="token operator">=</span><span class="token string">"name"</span><span class="token operator">/</span><span class="token operator">></span>\n          <span class="token operator">&lt;</span><span class="token operator">/</span>ReferenceArrayInput<span class="token operator">></span>\n        <span class="token punctuation">;</span>\n\n        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>api<span class="token punctuation">,</span> resources<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">null</span> <span class="token operator">===</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>api<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token operator">&lt;</span>div<span class="token operator">></span>Loading<span class="token operator">...</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span><span class="token punctuation">;</span>\n\n    <span class="token keyword">return</span> <span class="token operator">&lt;</span>AdminBuilder api<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>api<span class="token punctuation">}</span> dataProvider<span class="token operator">=</span><span class="token punctuation">{</span><span class="token function">hydraClient</span><span class="token punctuation">(</span><span class="token punctuation">{</span>entrypoint<span class="token punctuation">:</span> entrypoint<span class="token punctuation">,</span> resources<span class="token punctuation">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>resources<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">/</span><span class="token operator">></span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>The admin now properly handles this <code>to-many</code> relation!</p>\n<h2 id="using-an-autocomplete-input-for-relations"><a href="#using-an-autocomplete-input-for-relations" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Using an Autocomplete Input for Relations</h2>\n<p>We\'ll make one last improvement to our admin: transforming the relation selector we just created to use autocompletion.</p>\n<p>Start by adding a "partial search" filter on the <code>name</code> property of the <code>Book</code> resource class.</p>\n<div class="gatsby-highlight">\n      <pre class="language-yaml"><code><span class="token comment"># api/config/services.yaml</span>\n<span class="token key atrule">services</span><span class="token punctuation">:</span>\n    <span class="token key atrule">person.search_filter</span><span class="token punctuation">:</span>\n        <span class="token key atrule">parent</span><span class="token punctuation">:</span> <span class="token string">\'api_platform.doctrine.orm.search_filter\'</span>\n        <span class="token key atrule">arguments</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token punctuation">{</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">\'partial\'</span> <span class="token punctuation">}</span> <span class="token punctuation">]</span>\n        <span class="token comment"># Uncomment only if you don\'t use autoconfiguration</span>\n        <span class="token comment">#tags: [\'api_platform.filter\']</span>\n</code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-php"><code><span class="token delimiter important">&lt;?php</span>\n<span class="token comment">// api/src/Entity/Person.php</span>\n<span class="token comment">// ...</span>\n\n<span class="token comment">/**\n * @ApiResource(attributes={"filters"={"person.search_filter"}})\n * @ORM\\Entity\n */</span>\n<span class="token keyword">class</span> <span class="token class-name">Person</span>\n<span class="token punctuation">{</span>\n    <span class="token comment">// ...</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Then edit the configuration of API Platform Admin to pass a <code>filterToQuery</code> property to the <code>ReferenceArrayInput</code> component.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code>  <span class="token function">componentDidMount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\n    <span class="token comment">// ...</span>\n\n    <span class="token comment">// Set the input in the edit and create views</span>\n    books<span class="token punctuation">.</span>writableFields<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>f <span class="token operator">=></span> <span class="token string">\'authors\'</span> <span class="token operator">===</span> f<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">.</span>inputComponent <span class="token operator">=</span>\n      <span class="token operator">&lt;</span>ReferenceArrayInput label<span class="token operator">=</span><span class="token string">"Authors"</span> reference<span class="token operator">=</span><span class="token string">"people"</span> source<span class="token operator">=</span><span class="token string">"authors"</span> key<span class="token operator">=</span><span class="token string">"authors"</span> filterToQuery<span class="token operator">=</span><span class="token punctuation">{</span>searchText <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span> name<span class="token punctuation">:</span> searchText <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">></span>\n        <span class="token operator">&lt;</span>SelectArrayInput optionText<span class="token operator">=</span><span class="token string">"name"</span><span class="token operator">/</span><span class="token operator">></span>\n      <span class="token operator">&lt;</span><span class="token operator">/</span>ReferenceArrayInput<span class="token operator">></span>\n    <span class="token punctuation">;</span>\n\n    <span class="token comment">// ...</span>\n  <span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>The autocomplete field should now work properly!</p>'},navDoc:{edges:[{node:{title:"The Distribution",path:"distribution",items:[{id:"index",title:"Creating a Fully Featured API in 5 Minutes",anchors:null},{id:"testing",title:"Testing and Specifying the API",anchors:null}]}},{node:{title:"The API Component",path:"core",items:[{id:"index",title:"Introduction",anchors:null},{id:"getting-started",title:"Getting Started",anchors:[{id:"installing-api-platform-core",title:"Installing API Platform Core"},{id:"before-reading-this-documentation",title:"Before Reading this Documentation"},{id:"mapping-the-entities",title:"Mapping the Entities"}]},{id:"configuration",title:"Configuration",anchors:null},{id:"operations",title:"Operations",anchors:[{id:"enabling-and-disabling-operations",title:"Enabling and Disabling Operations"},{id:"configuring-operations",title:"Configuring Operations"},{id:"subresources",title:"Subresources"},{id:"creating-custom-operations-and-controllers",title:"Creating Custom Operations and Controllers"}]},{id:"default-order",title:"Overriding Default Order",anchors:null},{id:"filters",title:"Filters",anchors:[{id:"doctrine-orm-filters",title:"Doctrine ORM Filters"},{id:"serializer-filters",title:"Serializer Filters"},{id:"creating-custom-filters",title:"Creating Custom Filters"},{id:"apifilter-annotation",title:"ApiFilter Annotation"}]},{id:"serialization",title:"The Serialization Process",anchors:[{id:"overall-process",title:"Overall Process"},{id:"available-serializers",title:"Available Serializers"},{id:"the-serialization-context-groups-and-relations",title:"The Serialization Context, Groups and Relations"},{id:"using-serialization-groups",title:"Using Serialization Groups"},{id:"using-different-serialization-groups-per-operation",title:"Using Different Serialization Groups per Operation"},{id:"changing-the-serialization-context-dynamically",title:"Changing the Serialization Context Dynamically"},{id:"changing-the-serialization-context-on-a-per-item-basis",title:"Changing the Serialization Context on a Per Item Basis"},{id:"name-conversion",title:"Name Conversion"},{id:"decorating-a-serializer-and-add-extra-data",title:"Decorating a Serializer and Add Extra Data"},{id:"entity-identifier-case",title:"Entity Identifier Case"},{id:"embedding-the-json-ld-context",title:"Embedding the JSON-LD Context"}]},{id:"validation",title:"Validation",anchors:[{id:"using-validation-groups",title:"Using Validation Groups"},{id:"dynamic-validation-groups",title:"Dynamic Validation Groups"},{id:"error-levels-and-payload-serialization",title:"Error Levels and Payload Serialization"}]},{id:"errors",title:"Error Handling",anchors:[{id:"converting-php-exceptions-to-http-errors",title:"Converting PHP Exceptions to HTTP Errors"}]},{id:"pagination",title:"Pagination",anchors:[{id:"disabling-the-pagination",title:"Disabling the Pagination"},{id:"changing-the-number-of-items-per-page",title:"Changing the Number of Items per Page"},{id:"partial-pagination",title:"Partial Pagination"}]},{id:"events",title:"The Event System",anchors:null},{id:"content-negotiation",title:"Content Negotiation",anchors:[{id:"enabling-several-formats",title:"Enabling Several Formats"},{id:"registering-a-custom-serializer",title:"Registering a Custom Serializer"},{id:"creating-a-responder",title:"Creating a Responder"},{id:"writing-a-custom-normalizer",title:"Writing a Custom Normalizer"}]},{id:"external-vocabularies",title:"Using External JSON-LD Vocabularies",anchors:null},{id:"extending-jsonld-context",title:"Extending JSON-LD context",anchors:null},{id:"data-providers",title:"Data Providers",anchors:[{id:"custom-collection-data-provider",title:"Custom Collection Data Provider"},{id:"custom-item-data-provider",title:"Custom Item Data Provider"},{id:"injecting-the-serializer-in-an-itemdataprovider",title:'Injecting the Serializer in an "ItemDataProvider"'}]},{id:"extensions",title:"Extensions",anchors:[{id:"custom-extension",title:"Custom Extension"},{id:"example",title:"Filter upon the current user"}]},{id:"security",title:"Security",anchors:null},{id:"performance",title:"Performance",anchors:[{id:"enabling-the-builtin-http-cache-invalidation-system",title:"Enabling the Built-in HTTP Cache Invalidation System"},{id:"enabling-the-metadata-cache",title:"Enabling the Metadata Cache"},{id:"using-ppm-php-pm",title:"Using PPM (PHP-PM)"},{id:"doctrine-queries-and-indexes",title:"Doctrine Queries and Indexes"}]},{id:"operation-path-naming",title:"Operation Path Naming",anchors:[{id:"configuration",title:"Configuration"},{id:"create-a-custom-operation-path-resolver",title:"Create a Custom Operation Path Naming"}]},{id:"form-data",title:"Accept application/x-www-form-urlencoded Form Data",anchors:null},{id:"fosuser-bundle",title:"FOSUserBundle Integration",anchors:[{id:"installing-the-bundle",title:"Installing the Bundle"},{id:"enabling-the-bridge",title:"Enabling the Bridge"},{id:"creating-a-user-entity-with-serialization-groups",title:'Creating a "User" Entity with Serialization Groups'}]},{id:"jwt",title:"Adding a JWT authentication using LexikJWTAuthenticationBundle",anchors:[{id:"testing-with-swagger",title:"Testing with Swagger"},{id:"testing-with-behat",title:"Testing with Behat"}]},{id:"nelmio-api-doc",title:"NelmioApiDocBundle integration",anchors:null},{id:"angularjs-integration",title:"AngularJS Integration",anchors:[{id:"restangular",title:"Restangular"},{id:"ng-admin",title:"ng-admin"}]},{id:"swagger",title:"Swagger Support",anchors:[{id:"override-swagger-documentation",title:"Override Swagger documentation"}]},{id:"graphql",title:"GraphQL Support",anchors:[{id:"overall-view",title:"Overall View"},{id:"enabling-graphql",title:"Enabling GraphQL"},{id:"graphiql",title:"GraphiQL"}]},{id:"dto",title:"Handling Data Transfer Objects (DTOs)",anchors:null},{id:"file-upload",title:"Handling File Upload with VichUploaderBundle",anchors:null}]}},{node:{title:"The Schema Generator Component",path:"schema-generator",items:[{id:"index",title:"Introduction",anchors:null},{id:"getting-started",title:"Getting Started",anchors:null},{id:"configuration",title:"Configuration",anchors:null}]}},{node:{title:"The Admin Component",path:"admin",items:[{id:"index",title:"Introduction",anchors:[{id:"features",title:"Features"}]},{id:"getting-started",title:"Getting Started",anchors:[{id:"installation",title:"Installation"},{id:"creating-the-admin",title:"Creating the Admin"},{id:"customizing-the-admin",title:"Customizing the Admin"}]},{id:"authentication-support",title:"Authentication Support",anchors:null},{id:"handling-relations-to-collections",title:"Handling Relations to Collections",anchors:[{id:"using-an-autocomplete-input-for-relations",title:"Using an Autocomplete Input for Relations"}]}]}},{node:{title:"The Client Generator Component",path:"client-generator",items:[{id:"index",title:"Introduction",anchors:[{id:"features",title:"Features"}]},{id:"react",title:"React generator",anchors:null},{id:"vuejs",title:"Vue.js generator",anchors:null},{id:"troubleshooting",title:"Troubleshooting",anchors:null}]}},{node:{title:"Deployment",path:"deployment",items:[{id:"index",title:"Introduction",anchors:null},{id:"kubernetes",title:"Deploying to a Kubernetes Cluster",anchors:null},{id:"heroku",title:"Deploying an API Platform App on Heroku",anchors:null}]}},{node:{title:"Extra",path:"extra",items:[{id:"releases",title:"The Release Process",anchors:null},{id:"philosophy",title:"The Project's Philosophy",anchors:null},{id:"troubleshooting",title:"Troubleshooting",anchors:null},{id:"contribution-guides",title:"Contribution Guides",anchors:null},{id:"conduct",title:"Contributor Code Of Conduct",anchors:null}]}}]}},pathContext:{path:"docs/admin/handling-relations-to-collections",current:{path:"docs/admin/handling-relations-to-collections",title:"The Admin Component - Handling Relations to Collections"},prev:{path:"docs/admin/authentication-support",title:"Authentication Support",rootPath:"The Admin Component"},next:{path:"docs/client-generator/index",title:"The Client Generator Component - Introduction"}}}}});
//# sourceMappingURL=path---docs-admin-handling-relations-to-collections-3888b7133e5d1b75d0b9.js.map