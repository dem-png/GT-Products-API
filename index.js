import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import postRoutes from './src/routes/post.routes.js';
import { testConnection } from './src/config/db.js';
import { errorHandler } from './src/middlewares/errorHandler.middleware.js';
import commentRoutes from './src/routes/comment.routes.js';
import userRoutes from './src/routes/user.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import photoRoutes from './src/routes/photo.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
    crossOriginEmbedderPolicy: false
}));

const corsOptions = {
    origin: process.env.FRONTEND_ORIGIN || '*',
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('tiny'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'HelloWorld API',
            version: '1.0.0',
            description: 'A comprehensive REST API with authentication, posts, comments, users, and photos',
            contact: {
                name: 'API Support',
                email: 'support@example.com'
            },
            license: {
                name: 'ISC',
                url: 'https://opensource.org/licenses/ISC'
            }
        },
        servers: [
            {
                url: `http://localhost:${port}`,
                description: 'Development server'
            },
            {
                url: process.env.API_URL || 'https://api.example.com',
                description: 'Production server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter JWT token'
                }
            },
            schemas: {
                Error: {
                    type: 'object',
                    properties: {
                        statusCode: {
                            type: 'integer',
                            example: 400
                        },
                        message: {
                            type: 'string',
                            example: 'Error message'
                        }
                    }
                },
                ApiResponse: {
                    type: 'object',
                    properties: {
                        statusCode: {
                            type: 'integer'
                        },
                        data: {
                            type: 'object'
                        },
                        message: {
                            type: 'string'
                        }
                    }
                }
            }
        },
        tags: [
            {
                name: 'Authentication',
                description: 'User authentication endpoints'
            },
            {
                name: 'Users',
                description: 'User management endpoints'
            },
            {
                name: 'Posts',
                description: 'Post management endpoints'
            },
            {
                name: 'Comments',
                description: 'Comment management endpoints'
            },
            {
                name: 'Photos',
                description: 'Photo management endpoints'
            }
        ]
    },
    apis: ['./src/routes/*.js', './src/controllers/*.js', './index.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'HelloWorld API Documentation',
    swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        docExpansion: 'list',
        filter: true,
        showExtensions: true,
        showCommonExtensions: true
    }
}));

app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/comments', commentRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/photos', photoRoutes);

app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/photos', photoRoutes);

app.get('/', (req, res) => {
    res.json({ 
        message: 'HelloWorld API is running!', 
        version: '1.0.0',
        documentation: '/api-docs',
        endpoints: {
            posts: ['/api/posts', '/api/v1/posts'],
            comments: ['/api/comments', '/api/v1/comments'],
            users: ['/api/users', '/api/v1/users'],
            auth: ['/api/auth', '/api/v1/auth'],
            photos: ['/api/photos', '/api/v1/photos']
        },
        examples: {
            register: 'POST /api/auth/register',
            login: 'POST /api/auth/login',
            getPosts: 'GET /api/posts'
        }
    });
});

app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`API endpoints available at http://localhost:${port}/api/v1/`);
    console.log(`API Documentation available at http://localhost:${port}/api-docs`);
    testConnection();
});