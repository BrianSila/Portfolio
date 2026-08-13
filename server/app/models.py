from datetime import datetime

from extensions import db


class Project(db.Model):
    """
    Barebones Project model.

    Minimal fields for now — just enough to establish the structural
    pattern (table name, primary key, timestamp). Full fields
    (description, tech_stack relationship, status, etc.) get added
    once we design the real migration in Sprint 1's later tasks.
    """
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Project {self.id}: {self.title}>'

    def to_dict(self):
        """Basic serialization helper until Marshmallow schemas are added."""
        return {
            'id': self.id,
            'title': self.title,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }


class Review(db.Model):
    """
    Barebones Review model.

    Same minimal-fields approach as Project — establishes the pattern,
    full client_name/quote/company fields come later.
    """
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Review {self.id}: {self.name}>'

    def to_dict(self):
        """Basic serialization helper until Marshmallow schemas are added."""
        return {
            'id': self.id,
            'name': self.name,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }
