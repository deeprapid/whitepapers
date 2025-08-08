# Contributing to DeepRapid AI Whitepapers

Thank you for your interest in contributing to our whitepapers! We welcome contributions from the community.

## How to Contribute

### 1. **Fork and Clone**
- Fork this repository
- Clone your fork locally
- Create a new branch for your contribution

### 2. **Adding New Whitepapers**

#### File Structure
```
content/en/
├── your-whitepaper-name.md
└── another-whitepaper.md
```

#### Front Matter
Each whitepaper should include proper front matter:

```yaml
---
layout: whitepaper
title: "Your Whitepaper Title"
subtitle: "A brief description of the whitepaper"
date: YYYY-MM-DD
author: "Your Name"
reading_time: 15
tags: ["tag1", "tag2", "tag3"]
---
```

#### Content Guidelines
- Use clear, engaging titles
- Include an executive summary
- Structure with proper headings (H2, H3, H4)
- Include code examples where relevant
- Add diagrams or images when helpful
- Keep paragraphs concise and readable
- Use markdown formatting consistently

### 3. **Translation Contributions**

We welcome translations! To add a translation:

1. Create the appropriate language folder: `content/[language-code]/`
2. Translate the whitepaper content
3. Update the navigation and metadata
4. Test the build locally

### 4. **Technical Improvements**

#### CSS/Styling
- Follow the existing SCSS structure
- Use the defined variables and mixins
- Ensure responsive design
- Test across different browsers

#### JavaScript
- Follow the existing patterns
- Add comments for complex logic
- Test functionality thoroughly
- Consider accessibility

#### Jekyll Configuration
- Update `_config.yml` for new features
- Add new collections if needed
- Update navigation and metadata

### 5. **Quality Standards**

#### Content
- Original, well-researched content
- Proper citations and references
- Clear, professional writing
- Accurate technical information

#### Code
- Clean, readable code
- Proper error handling
- Performance considerations
- Security best practices

#### Design
- Consistent with existing design
- Accessible to all users
- Mobile-responsive
- Fast loading times

## Development Setup

### Prerequisites
- Ruby 3.2+
- Bundler
- Git

### Local Development
```bash
# Install dependencies
bundle install

# Start local server
bundle exec jekyll serve

# Build for production
bundle exec jekyll build
```

### Testing
```bash
# Test the build
bundle exec jekyll build --safe

# Check for broken links
bundle exec htmlproofer ./_site --allow-missing-href
```

## Pull Request Process

1. **Create a descriptive PR title**
2. **Add a detailed description** of your changes
3. **Include screenshots** for visual changes
4. **Test thoroughly** before submitting
5. **Follow the existing code style**
6. **Update documentation** if needed

## Review Process

- All contributions are reviewed by maintainers
- We may request changes or improvements
- We aim to respond within 48 hours
- Once approved, your contribution will be merged

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Follow the project's coding standards

## Questions?

If you have questions about contributing:
- Open an issue for general questions
- Check existing issues for similar questions
- Join our community discussions

Thank you for contributing to the future of AI-first architecture! 🚀 