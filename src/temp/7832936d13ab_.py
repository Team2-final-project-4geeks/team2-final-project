"""empty message

Revision ID: 7832936d13ab
Revises: 7bd1c253752b
Create Date: 2023-07-31 17:05:57.967671

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7832936d13ab'
down_revision = '7bd1c253752b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('username', sa.String(length=120), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('username')

    # ### end Alembic commands ###
