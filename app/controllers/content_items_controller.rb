class ContentItemsController < AdminController
  include ContentItemHelper
  include PopupHelper

  def index
    @index = IndexDecoratorService.new(content_type: content_type)
    @content_items = content_type.content_items
    add_breadcrumb content_type.name.pluralize
  end

  def new
    @content_item = content_type.content_items.new
    content_type.fields.each do |field|
      @content_item.field_items << FieldItem.new(field: field)
    end
    @wizard = WizardDecoratorService.new(content_item: @content_item)

    add_breadcrumb content_type.name.pluralize, :content_type_content_items_path
    add_breadcrumb 'New'
  end

  def edit
    @content_item = content_type.content_items.find_by_id(params[:id])
    @wizard = WizardDecoratorService.new(content_item: @content_item)

    title = @content_item.field_items.find { |field_item| field_item.field.name == 'Title' }.data['text']
    add_breadcrumb content_type.name.pluralize, :content_type_content_items_path
    add_breadcrumb title
    add_breadcrumb 'Edit'
  end

  def update
    if content_item.update
      flash[:success] = "ContentItem updated"
    else
      flash[:warning] = "ContentItem failed to update! Reason: #{@content_item.errors.full_messages}"
    end

    redirect_to content_type_content_items_path
  end

  def create
  #  cnt_item = content_item.create
  #  binding.pry
    begin
      @content_item = content_item.create
    rescue Exception => e
      flash[:warning] = "ContentItem failed to create! Reason: #{e.message}"
      @content_type = content_type
      @content_item = content_type.content_items.new(content_item_params)
      @content_item = ContentItem.new
      params[:content_item]["field_items_attributes"].to_hash.each do |key, value|
        value.delete("id")
        @content_item.field_items << FieldItem.new(value)
      end

      content_item_params.delete("field_items_attributes")
      @content_item.attributes = params[:content_item].to_hash
      #binding.pry
      @wizard = WizardDecoratorService.new(content_item: @content_item)
      render action: :new
    else
      flash[:success] = "ContentItem created"
      redirect_to content_type_content_items_path
    end
  end
end
