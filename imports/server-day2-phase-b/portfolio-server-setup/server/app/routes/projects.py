from flask import Blueprint, jsonify
from flask_cors import cross_origin

# Blueprint registered under url_prefix='/api/projects' in app/__init__.py,
# so routes here are relative (e.g. '' below resolves to GET /api/projects).
projects_bp = Blueprint('projects', __name__)


@projects_bp.route('', methods=['GET'])
@cross_origin(origins='http://localhost:5173')
def get_projects():
    """
    GET /api/projects

    Walking-skeleton endpoint: returns hardcoded JSON shaped to match
    the frontend's mock data structure (see client/src/data/projects.json)
    so ProjectCard.jsx can render it with zero changes.

    Once the database is seeded, this will query Project.query and
    serialize via to_dict() / a Marshmallow schema instead of returning
    a static list.
    """
    hardcoded_projects = [
        {
            "id": 1,
            "title": "E-commerce Platform Redesign",
            "slug": "ecommerce-platform-redesign",
            "description": (
                "A complete fullstack rebuild of a legacy e-commerce platform. "
                "Optimized for performance, accessibility, and modern UX patterns."
            ),
            "demo_url": "https://example.com/demo1",
            "repo_url": "https://github.com/example/ecommerce",
            "featured": True,
            "tech_stack": [
                {"id": 1, "name": "React", "category": "frontend"},
                {"id": 2, "name": "Flask", "category": "backend"},
                {"id": 3, "name": "PostgreSQL", "category": "backend"},
            ],
        },
        {
            "id": 2,
            "title": "Real-time Collaboration Dashboard",
            "slug": "realtime-collaboration-dashboard",
            "description": (
                "A WebSocket-powered dashboard for teams to collaborate on projects "
                "in real-time, featuring live cursor tracking and instant updates."
            ),
            "demo_url": "https://example.com/demo2",
            "repo_url": "https://github.com/example/collaboration",
            "featured": True,
            "tech_stack": [
                {"id": 1, "name": "React", "category": "frontend"},
                {"id": 4, "name": "Socket.io", "category": "backend"},
                {"id": 5, "name": "Redis", "category": "backend"},
            ],
        },
        {
            "id": 3,
            "title": "AI-Powered Content Curator",
            "slug": "ai-content-curator",
            "description": (
                "A web application that uses machine learning to aggregate, analyze, "
                "and personalize content recommendations for users."
            ),
            "demo_url": "https://example.com/demo3",
            "repo_url": "https://github.com/example/ai-curator",
            "featured": False,
            "tech_stack": [
                {"id": 1, "name": "React", "category": "frontend"},
                {"id": 6, "name": "Flask", "category": "backend"},
                {"id": 7, "name": "TensorFlow", "category": "backend"},
            ],
        },
    ]

    return jsonify(hardcoded_projects), 200
