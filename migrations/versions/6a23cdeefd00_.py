"""empty message

Revision ID: 6a23cdeefd00
Revises: 014e2a0610bb
Create Date: 2023-07-21 17:23:10.068933

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6a23cdeefd00'
down_revision = '014e2a0610bb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('product',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('tittle', sa.String(length=120), nullable=False),
    sa.Column('description', sa.String(length=1000), nullable=False),
    sa.Column('image', sa.String(length=120), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('description'),
    sa.UniqueConstraint('tittle')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('product')
    # ### end Alembic commands ###
